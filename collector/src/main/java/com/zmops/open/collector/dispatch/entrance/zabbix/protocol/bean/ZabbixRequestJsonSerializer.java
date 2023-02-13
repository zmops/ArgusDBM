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

package com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean;

import com.google.gson.*;

import java.lang.reflect.Type;

/**
 * Deserialize request from the Zabbix
 * @author nantian  Zabbix protocol type
 */
public class ZabbixRequestJsonSerializer implements JsonSerializer<ZabbixRequest> {

    @Override
    public JsonElement serialize(ZabbixRequest request, Type type, JsonSerializationContext context) {

        ZabbixProtocolType protocolType = request.getType();

        JsonObject json = new JsonObject();
        json.addProperty("version", "6.0");
        json.addProperty("host", request.getHost());

        if (protocolType == ZabbixProtocolType.ACTIVE_CHECKS) {
            json.addProperty("request", "active checks");
        } else if (protocolType == ZabbixProtocolType.AGENT_DATA) {
            json.addProperty("request", "agent data");
            json.addProperty("session", request.getSession());
            json.add("data", new Gson().toJsonTree(request.getAgentDataList()));
        }
        return json;
    }
}
