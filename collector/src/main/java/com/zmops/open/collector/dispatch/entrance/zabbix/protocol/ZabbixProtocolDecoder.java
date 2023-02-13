/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.zmops.open.collector.dispatch.entrance.zabbix.protocol;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixResponse;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixResponseJsonDeserializer;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * @author nantian zabbix server response data protocol decoder
 */
public class ZabbixProtocolDecoder extends ByteToMessageDecoder {
    private static final int HEADER_LEN = 9;
    private static final byte[] PROTOCOL = new byte[]{'Z', 'B', 'X', 'D'};

    private static final int HEADER_FLAG_LEN = 4;

    private final Gson requestParser = new GsonBuilder()
            .registerTypeAdapter(ZabbixResponse.class, new ZabbixResponseJsonDeserializer()).create();

    @Override
    protected void decode(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf, List<Object> list)
            throws Exception {
        try {
            // Decode header and get payload
            String payload = decodeToPayload(channelHandlerContext, byteBuf);
            if (payload == null) {
                return;
            }

            System.out.println("ZabbixServer 响应数据为：" + payload);

            // Parse content and add to list
            ZabbixResponse response = requestParser.fromJson(payload, ZabbixResponse.class);
            list.add(response);
        } catch (Exception e) {
            errorProtocol(channelHandlerContext, byteBuf, "Parsing zabbix request data error", e);
        }
    }

    /**
     * Decode protocol to payload string
     */
    public String decodeToPayload(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf)
            throws InterruptedException, ZabbixErrorProtocolException {
        int readable = byteBuf.readableBytes();
        int baseIndex = byteBuf.readerIndex();
        if (readable < HEADER_LEN) {
            byteBuf.readerIndex(baseIndex);
            return null;
        }

        // Read header
        ByteBuf headerBuf = byteBuf.readSlice(HEADER_LEN);
        if (headerBuf.getByte(0) != PROTOCOL[0] || headerBuf.getByte(1) != PROTOCOL[1]
                || headerBuf.getByte(2) != PROTOCOL[2] || headerBuf.getByte(3) != PROTOCOL[3]) {
            throw new ZabbixErrorProtocolException("header is not right");
        }

        // Only support communications protocol
        if (headerBuf.getByte(HEADER_FLAG_LEN) != 1) {
            throw new ZabbixErrorProtocolException("header flags only support communications protocol");
        }

        // Check payload
        int dataLength = headerBuf.getByte(5) & 0xFF
                | (headerBuf.getByte(6) & 0xFF) << 8
                | (headerBuf.getByte(7) & 0xFF) << 16
                | (headerBuf.getByte(8) & 0xFF) << 24;
        int totalLength = HEADER_LEN + dataLength + 4;
        // If not receive all data, reset buffer and re-decode after content receive finish
        if (readable < totalLength) {
            byteBuf.readerIndex(baseIndex);
            return null;
        }

        if (dataLength <= 0) {
            throw new ZabbixErrorProtocolException("content could not be empty");
        }

        // Skip protocol extensions
        byteBuf.skipBytes(4);

        // Reading content
        ByteBuf payload = byteBuf.readSlice(dataLength);

        return payload.toString(StandardCharsets.UTF_8);
    }

    /**
     * Close connection if protocol error
     */
    protected void errorProtocol(ChannelHandlerContext context, ByteBuf byteBuf, String reason, Throwable ex) throws InterruptedException {
        // Skip all content
        byteBuf.skipBytes(byteBuf.readableBytes());
        // Close connection
        context.close();
    }

}
