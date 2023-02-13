package com.zmops.open.collector.dispatch.entrance.zabbix.agent;

import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixResponse;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * @author nantian  Zabbix protocol type
 */
public class TcpClientHandler extends SimpleChannelInboundHandler<ZabbixResponse> {


    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, ZabbixResponse response) throws Exception {

    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        super.channelActive(ctx);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
