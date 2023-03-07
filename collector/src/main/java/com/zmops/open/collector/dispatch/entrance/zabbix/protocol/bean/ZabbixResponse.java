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

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author nantian  Zabbix protocol type
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class ZabbixResponse {

    public static final String APP = "app";
    public static final String METRICS = "metrics";
    public static final String HOST = "host";
    public static final String PORT = "port";
    public static final String TIMEOUT = "timeout";
    public static final String DATABASE = "database";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";
    public static final String URL = "url";

    /**
     * Protocol type
     */
    private ZabbixProtocolType type;

    private List<ActiveChecks> activeChecks;

    private AgentData agentData;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ActiveChecks {
        private String key;
        private Long itemid;
        private String delay;
        private int mtime;
        private int lastlogsize;

        public Map<String, String> getParamsMap() {
            Map<String, String> paramsMap = new HashMap<>(8);
            if (key != null && key.length() > 0 && key.contains("[") && key.contains("]")) {
                try {
                    int startIndex = key.indexOf('[');
                    int endIndex = key.indexOf(']');
                    String preStr = key.substring(0, startIndex);
                    String endStr = key.substring(startIndex + 1, endIndex);
                    String[] params = endStr.split(",");
                    String[] keys = preStr.split("\\.");
                    if (keys.length != 2 || params.length < 6) {
                        log.error("zabbix metric key {} do not meet the requirements. ", key);
                    } else {
                        paramsMap.put(APP, keys[0]);
                        paramsMap.put(METRICS, keys[1]);
                        paramsMap.put(HOST, params[0]);
                        paramsMap.put(PORT, params[1]);
                        paramsMap.put(TIMEOUT, params[2]);
                        paramsMap.put(DATABASE, params[3]);
                        paramsMap.put(USERNAME, params[4]);
                        paramsMap.put(PASSWORD, params[5]);
                        if (params.length >= 7) {
                            paramsMap.put(URL, params[6]);
                        }
                    }
                } catch (Exception e) {
                    log.error("zabbix metric key {} do not meet the requirements. ", key);
                }
            } else {
                log.error("zabbix metric key {} do not meet the requirements. ", key);
            }
            return paramsMap;
        }
    }

    @Getter
    @Builder
    public static class AgentData {
        private String info;
    }
}
