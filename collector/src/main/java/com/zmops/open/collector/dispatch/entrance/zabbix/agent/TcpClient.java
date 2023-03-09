package com.zmops.open.collector.dispatch.entrance.zabbix.agent;

import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.ZabbixProtocolDataCodec;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import lombok.extern.slf4j.Slf4j;

/**
 * @author nantian  Zabbix protocol type
 */
@Slf4j
public class TcpClient {

    private final String host;
    private final int port;
    private Channel channel;
    private EventLoopGroup group;

    public TcpClient(String host, int port) {
        this.host = host;
        this.port = port;
    }

    public void shutdown() throws InterruptedException {
        channel.closeFuture().sync();
        group.shutdownGracefully();

    }

    public void start() throws Exception {
        group = new NioEventLoopGroup();

        Bootstrap b = new Bootstrap();
        b.group(group).channel(NioSocketChannel.class)
                .handler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    public void initChannel(SocketChannel ch) throws Exception {
                        ChannelPipeline pipeline = ch.pipeline();
                        pipeline.addLast(new ZabbixProtocolDataCodec());
                        pipeline.addLast(new TcpClientHandler());
                    }
                });

        final ChannelFuture future = b.connect(host, port).sync();

        future.addListener((ChannelFutureListener) arg0 -> {
            if (future.isSuccess()) {
                log.info("connect zabbix server success!");
            } else {
                log.error("connect zabbix server failed！");
                future.cause().printStackTrace();
                group.shutdownGracefully();
            }
        });

        this.channel = future.channel();
    }

    public Channel getChannel() {
        return channel;
    }
}
