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
    private TcpClient zabbixAgent;
    private String sessionId;
    private Map<String, TcpClientHandler> agentHostHandlerMap;
    private static Map<Long, String> itemIdAgentHostMap  = new ConcurrentHashMap<>(8);
    private DispatchProperties.EntranceProperties.ZabbixProperties zabbixProperties;

    public ZabbixAgentService(DispatchProperties dispatchProperties) {
        this.metricsDataQueue = new LinkedBlockingQueue<>();
        this.agentHostHandlerMap = new HashMap<>(8);
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
                TcpClientHandler clientHandler = agentHostHandlerMap.get(agentHost);
                if (clientHandler == null) {
                    clientHandler = new TcpClientHandler(agentHost);
                    agentHostHandlerMap.put(agentHost, clientHandler);
                }
                TcpClient zabbixAgent = new TcpClient(zabbixProperties.getHost(), zabbixProperties.getPort(), clientHandler);
                zabbixAgent.start();
                sessionId = UUID.randomUUID().toString().replace("-", "");
                Channel channel = zabbixAgent.getChannel();
                ZabbixRequest request = new ZabbixRequest();
                request.setType(ZabbixProtocolType.ACTIVE_CHECKS);
                request.setHost(agentHost);
                channel.writeAndFlush(request);
                Thread.sleep(4000);
                zabbixAgent.shutdown();
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
                    if (metricsData != null && metricsData.getCode() == CollectRep.Code.SUCCESS) {
                        Channel dataChannel;
                        if (zabbixAgent == null || zabbixAgent.getChannel() == null || !zabbixAgent.getChannel().isActive()) {
                            zabbixAgent = new TcpClient(zabbixProperties.getHost(), zabbixProperties.getPort(), null);
                            zabbixAgent.start();
                            sessionId = UUID.randomUUID().toString().replace("-", "");
                        }
                        dataChannel = zabbixAgent.getChannel();
                        String agentHost = itemIdAgentHostMap.get(metricsData.getId());
                        ZabbixRequest requestData = new ZabbixRequest();
                        requestData.setType(ZabbixProtocolType.AGENT_DATA);
                        requestData.setHost(agentHost);
                        // agent 启动时生成， 32位
                        requestData.setSession(sessionId);
                        ZabbixRequest.AgentData data = new ZabbixRequest.AgentData();
                        data.setItemid((int) metricsData.getId());
                        List<Map<String, String>> dataList = new LinkedList<>();
                        AtomicBoolean isMultiInstance = new AtomicBoolean(false);
                        metricsData.getValuesList().forEach(values -> {
                            Map<String, String> dataMap = new HashMap<>(8);
                            String instance = values.getInstance();
                            if (StringUtils.hasText(instance)) {
                                dataMap.put("{#INSTANCE}", instance);
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
                        data.setClock(System.currentTimeMillis() / 1000);
                        // todo 采集消费时间
                        data.setNs(76808644);
                        requestData.setAgentDataList(Collections.singletonList(data));
                        dataChannel.writeAndFlush(requestData);
                    }
                } catch (Exception e) {}
            }
        };
        Executors.newSingleThreadExecutor().submit(runnable);
    }

    public void sendMetricsData(CollectRep.MetricsData metricsData) {
        this.metricsDataQueue.offer(metricsData);
    }

    public static void main(String[] args) throws Exception {

        TcpClient zabbixAgent = new TcpClient("localhost", 10051, null);
        zabbixAgent.start();

        Channel channel = zabbixAgent.getChannel();


        ZabbixRequest request = new ZabbixRequest();
        request.setType(ZabbixProtocolType.ACTIVE_CHECKS);
        request.setHost("ZabbixAgentTest");

        channel.writeAndFlush(request);
        zabbixAgent.shutdown();

        Thread.sleep(2000);

        //  Zabbix Server 会主动断开，每次提交数据都需要重新创建连接
        //==========================================================

        TcpClient zabbixAgent2 = new TcpClient("localhost", 10051, null);
        zabbixAgent2.start();

        Channel channel2 = zabbixAgent2.getChannel();

        ZabbixRequest requestData = new ZabbixRequest();
        requestData.setType(ZabbixProtocolType.AGENT_DATA);
        requestData.setHost("ZabbixAgentTest");
        // agent 启动时生成， 32位
        requestData.setSession(UUID.randomUUID().toString().replace("-", ""));

        Random random = new Random();

        ZabbixRequest.AgentData data = new ZabbixRequest.AgentData();
        data.setItemid(44301);
        data.setValue("" + random.nextInt(1000));
        data.setClock(System.currentTimeMillis() / 1000);
        data.setNs(76808644);

        requestData.setAgentDataList(Collections.singletonList(data));

        channel2.writeAndFlush(requestData);
        zabbixAgent2.shutdown();
    }
}
