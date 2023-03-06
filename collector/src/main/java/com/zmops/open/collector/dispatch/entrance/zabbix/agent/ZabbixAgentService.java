package com.zmops.open.collector.dispatch.entrance.zabbix.agent;


import com.zmops.open.collector.dispatch.DispatchProperties;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixProtocolType;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixRequest;
import com.zmops.open.common.entity.message.CollectRep;
import com.zmops.open.common.util.CommonConstants;
import com.zmops.open.common.util.GsonUtil;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

/**
 * @author nantian  Zabbix protocol type
 */
@Component
@ConditionalOnProperty(prefix = "collector.dispatch.entrance.zabbix",
        name = "enabled", havingValue = "true")
@Slf4j
public class ZabbixAgentService implements CommandLineRunner {

    private final LinkedBlockingQueue<CollectRep.MetricsData> metricsDataQueue;
    private TcpClient zabbixAgent;
    private String sessionId;

    private DispatchProperties.EntranceProperties.ZabbixProperties zabbixProperties;

    public ZabbixAgentService(DispatchProperties dispatchProperties) {
        this.metricsDataQueue = new LinkedBlockingQueue<>();
        this.zabbixProperties = dispatchProperties.getEntrance().getZabbix();
    }

    @Override
    public void run(String... args) throws Exception {
        zabbixAgent = new TcpClient(zabbixProperties.getHost(), zabbixProperties.getPort());
        zabbixAgent.start();
        sessionId = UUID.randomUUID().toString().replace("-", "");
        Channel channel = zabbixAgent.getChannel();
        ZabbixRequest request = new ZabbixRequest();
        request.setType(ZabbixProtocolType.ACTIVE_CHECKS);
        request.setHost(zabbixProperties.getAgentHost());
        channel.writeAndFlush(request);
        Thread.sleep(2000);

        Runnable runnable = () -> {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    CollectRep.MetricsData metricsData = metricsDataQueue.poll(2, TimeUnit.SECONDS);
                    if (metricsData != null && metricsData.getCode() == CollectRep.Code.SUCCESS) {
                        Channel dataChannel = zabbixAgent.getChannel();
                        if (dataChannel == null || !dataChannel.isActive()) {
                            zabbixAgent = new TcpClient(zabbixProperties.getHost(), zabbixProperties.getPort());
                            zabbixAgent.start();
                            sessionId = UUID.randomUUID().toString().replace("-", "");
                            dataChannel = zabbixAgent.getChannel();
                        }
                        ZabbixRequest requestData = new ZabbixRequest();
                        requestData.setType(ZabbixProtocolType.AGENT_DATA);
                        requestData.setHost(zabbixProperties.getAgentHost());
                        // agent 启动时生成， 32位
                        requestData.setSession(sessionId);
                        ZabbixRequest.AgentData data = new ZabbixRequest.AgentData();
                        data.setItemid((int) metricsData.getId());
                        List<Map<String, String>> dataList = new LinkedList<>();
                        metricsData.getValuesList().forEach(values -> {
                            Map<String, String> dataMap = new HashMap<>(8);
                            for (int i = 0; i < metricsData.getFieldsCount(); i++) {
                                CollectRep.Field field = metricsData.getFields(i);
                                String value = values.getColumns(i);
                                if (!CommonConstants.NULL_VALUE.equals(value)) {
                                    dataMap.put(field.getName(), value);
                                }
                            }
                            dataList.add(dataMap);
                        });
                        String dataJson = GsonUtil.toJson(dataList);
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

        TcpClient zabbixAgent = new TcpClient("localhost", 10051);
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

        TcpClient zabbixAgent2 = new TcpClient("localhost", 10051);
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
