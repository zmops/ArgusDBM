package com.zmops.open.collector.dispatch.entrance.zabbix.agent;


import com.zmops.open.collector.dispatch.DispatchProperties;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixProtocolType;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixRequest;
import com.zmops.open.common.entity.message.CollectRep;
import com.zmops.open.common.util.CommonConstants;
import com.zmops.open.common.util.GsonUtil;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * @author nantian  Zabbix protocol type
 */
@Component
@ConditionalOnProperty(prefix = "collector.dispatch.entrance.zabbix",
        name = "enabled", havingValue = "true")
@Slf4j
public class ZabbixAgentService {

    private final LinkedBlockingQueue<CollectRep.MetricsData> metricsDataQueue;
    private TcpClient flushTcpClient;
    private Channel flushChannel;
    private String sessionId;
    private Map<String, TcpClient> agentHostTcpClientMap;
    private static Map<Long, String> itemIdAgentHostMap  = new ConcurrentHashMap<>(8);
    private DispatchProperties.EntranceProperties.ZabbixProperties zabbixProperties;

    public ZabbixAgentService(DispatchProperties dispatchProperties) {
        this.metricsDataQueue = new LinkedBlockingQueue<>();
        this.agentHostTcpClientMap = new HashMap<>(8);
        this.zabbixProperties = dispatchProperties.getEntrance().getZabbix();
        pullMetricsConfigFromZabbix();
        initMetricsDataSender();
    }

    public static void addItemIdHostMap(Long itemId, String agentHost) {
        itemIdAgentHostMap.put(itemId, agentHost);
    }

    /**
     * 30s拉取一次
     */
    @Scheduled(fixedDelay = 30000)
    public void pullMetricsConfigFromZabbix() {
        try {
            List<String> agentHostList = zabbixProperties.getAgentHost();
            if (agentHostList == null) {
                log.error("agent host can not null!");
                return;
            }
            for (String agentHost : agentHostList) {
                TcpClient tcpClient = agentHostTcpClientMap.get(agentHost);
                if (tcpClient == null) {
                    TcpClientHandler clientHandler = new TcpClientHandler(agentHost);
                    tcpClient = new TcpClient(clientHandler);
                    agentHostTcpClientMap.put(agentHost, tcpClient);
                }
                sessionId = UUID.randomUUID().toString().replace("-", "");
                Channel channel = tcpClient.connect(zabbixProperties.getHost(), zabbixProperties.getPort());
                ZabbixRequest request = new ZabbixRequest();
                request.setType(ZabbixProtocolType.ACTIVE_CHECKS);
                request.setHost(agentHost);
                channel.writeAndFlush(request);
                Thread.sleep(4000);
                channel.close();
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    private void initMetricsDataSender() {
        Runnable runnable = () -> {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    CollectRep.MetricsData metricsData = metricsDataQueue.poll(2, TimeUnit.SECONDS);
                    if (metricsData != null) {
                        if (flushTcpClient == null) {
                            flushTcpClient = new TcpClient();
                            sessionId = UUID.randomUUID().toString().replace("-", "");
                        }
                        if (flushChannel == null || !flushChannel.isOpen()) {
                            flushChannel = flushTcpClient.connect(zabbixProperties.getHost(), zabbixProperties.getPort());
                        }
                        String agentHost = itemIdAgentHostMap.get(metricsData.getId());
                        ZabbixRequest requestData = new ZabbixRequest();
                        requestData.setType(ZabbixProtocolType.AGENT_DATA);
                        requestData.setHost(agentHost);
                        // agent 启动时生成， 32位
                        requestData.setSession(sessionId);
                        ZabbixRequest.AgentData data = new ZabbixRequest.AgentData();
                        data.setItemid((int) metricsData.getId());
                        if (metricsData.getCode() == CollectRep.Code.SUCCESS) {
                            List<Map<String, String>> dataList = new LinkedList<>();
                            AtomicBoolean isMultiInstance = new AtomicBoolean(false);
                            metricsData.getValuesList().forEach(values -> {
                                Map<String, String> dataMap = new HashMap<>(8);
                                String instance = values.getInstance();
                                if (StringUtils.hasText(instance)) {
                                    dataMap.put("{#INSTANCE}", instance);
                                    dataMap.put("{#KEYNAME}", "{#INSTANCE}");
                                    isMultiInstance.set(true);
                                }
                                for (int i = 0; i < metricsData.getFieldsCount(); i++) {
                                    CollectRep.Field field = metricsData.getFields(i);
                                    String value = values.getColumns(i);
                                    if (!CommonConstants.NULL_VALUE.equals(value)) {
                                        dataMap.put(field.getName(), value);
                                    }
                                }
                                dataList.add(dataMap);
                            });
                            String dataJson = null;
                            if (isMultiInstance.get()) {
                                dataJson = GsonUtil.toJson(dataList);
                            } else {
                                if (dataList.isEmpty()) {
                                    dataJson = GsonUtil.toJson(new HashMap<>(8));
                                } else {
                                    dataJson = GsonUtil.toJson(dataList.get(0));
                                }
                            }
                            data.setValue(dataJson);
                        } else {
                            data.setValue(metricsData.getCode() + ":" + metricsData.getMsg());
                        }
                        data.setClock(System.currentTimeMillis() / 1000);
                        // todo 采集消费时间
                        data.setNs(76808644);
                        requestData.setAgentDataList(Collections.singletonList(data));
                        flushChannel.writeAndFlush(requestData);
                    }
                } catch (Exception e) {
                    log.error(e.getMessage(), e);
                }
            }
        };
        Executors.newSingleThreadExecutor().submit(runnable);
    }

    public void sendMetricsData(CollectRep.MetricsData metricsData) {
        this.metricsDataQueue.offer(metricsData);
    }
}
