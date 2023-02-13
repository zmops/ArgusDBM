package com.zmops.open.collector.dispatch.entrance.zabbix.agent;


import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixProtocolType;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixRequest;
import io.netty.channel.Channel;

import java.util.Collections;
import java.util.Random;
import java.util.UUID;

/**
 * @author nantian  Zabbix protocol type
 */
public class ZabbixAgentClient {

    public static void main(String[] args) throws Exception {

        TcpClient zabbixAgent = new TcpClient("172.16.3.77", 10051);
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

        TcpClient zabbixAgent2 = new TcpClient("172.16.3.77", 10051);
        zabbixAgent2.start();

        Channel channel2 = zabbixAgent2.getChannel();

        ZabbixRequest requestData = new ZabbixRequest();
        requestData.setType(ZabbixProtocolType.AGENT_DATA);
        requestData.setHost("ZabbixAgentTest");
        // agent 启动时生成， 32位
        requestData.setSession(UUID.randomUUID().toString().replace("-", ""));

        Random random = new Random();

        ZabbixRequest.AgentData data = new ZabbixRequest.AgentData();
        data.setItemid(43488);
        data.setValue("" + random.nextInt(1000));
        data.setClock(System.currentTimeMillis() / 1000);
        data.setNs(76808644);

        requestData.setAgentDataList(Collections.singletonList(data));

        channel2.writeAndFlush(requestData);
        zabbixAgent2.shutdown();
    }
}
