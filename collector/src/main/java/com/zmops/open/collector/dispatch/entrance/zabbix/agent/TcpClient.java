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
    private EventLoopGroup group;

    private Bootstrap b;
    private TcpClientHandler tcpClientHandler;

    public TcpClient(TcpClientHandler clientHandler) {
        if (clientHandler == null) {
            clientHandler = new TcpClientHandler(null);
        }
        this.tcpClientHandler = clientHandler;
        init();
    }

    public TcpClient() {
        this.tcpClientHandler = new TcpClientHandler(null);
        init();
    }

    public void init() {
        group = new NioEventLoopGroup();

        b = new Bootstrap();
        b.group(group).channel(NioSocketChannel.class)
                .handler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    public void initChannel(SocketChannel ch) throws Exception {
                        ChannelPipeline pipeline = ch.pipeline();
                        pipeline.addLast(new ZabbixProtocolDataCodec());
                        pipeline.addLast(tcpClientHandler);
                    }
                });
    }

    public Channel connect(String host, int port) throws Exception {
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

        return future.channel();
    }
}
