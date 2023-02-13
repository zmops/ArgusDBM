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
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixRequest;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixRequestJsonSerializer;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToMessageEncoder;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * @author nantian  Zabbix protocol type
 */
public class ZabbixProtocolEncoder extends MessageToMessageEncoder<ZabbixRequest> {
    private final Gson gson = new GsonBuilder()
            .registerTypeAdapter(ZabbixRequest.class, new ZabbixRequestJsonSerializer()).create();

    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext, ZabbixRequest request, List<Object> list) throws Exception {
        String responsePayload = gson.toJson(request);

        // Build header
        int payloadLength = responsePayload.length();
        byte[] header = new byte[]{
                'Z', 'B', 'X', 'D', '\1',
                (byte) (payloadLength & 0xFF),
                (byte) (payloadLength >> 8 & 0xFF),
                (byte) (payloadLength >> 16 & 0xFF),
                (byte) (payloadLength >> 24 & 0xFF),
                '\0', '\0', '\0', '\0'};

        // Build and write ByteBuf
        ByteBuf buffer = channelHandlerContext.alloc().buffer(header.length + payloadLength);
        buffer.writeBytes(header);
        buffer.writeBytes(responsePayload.getBytes(StandardCharsets.UTF_8));
        buffer.retain();

        channelHandlerContext.writeAndFlush(buffer);
    }

}
