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
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * Deserializer Zabbix Response to JSON
 * @author nantian  Zabbix protocol type
 */
public class ZabbixResponseJsonDeserializer implements JsonDeserializer<ZabbixResponse> {


    @Override
    public ZabbixResponse deserialize(JsonElement json, Type type, JsonDeserializationContext context)
            throws JsonParseException {
        ZabbixResponse response = new ZabbixResponse();
        JsonObject jsonObject = json.getAsJsonObject();
        if (jsonObject != null && jsonObject.has("data")) {
            response.setType(ZabbixProtocolType.ACTIVE_CHECKS);
             JsonElement jsonElement = jsonObject.get("data");
            Type checksType = new TypeToken<List<ZabbixResponse.ActiveChecks>>(){}.getType();
            List<ZabbixResponse.ActiveChecks> activeChecks = new Gson().fromJson(jsonElement, checksType);
            response.setActiveChecks(activeChecks);
        }
        return response;
    }
}
