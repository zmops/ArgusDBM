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

import lombok.Data;

import java.util.List;

/**
 * @author nantian  Zabbix Request Object
 */
@Data
@SuppressWarnings("PMD")
public class ZabbixRequest {

    /**
     * Request type
     */
    private ZabbixProtocolType type;

    private String host;

    // 以下字段非必须

    private String host_metadata;

    private String hostinterface;

    private String ip;

    private Integer port;

    /**
     * Agent push data
     *
     * @see ZabbixProtocolType#AGENT_DATA
     */
    private List<AgentData> agentDataList;

    @Data
    public static class AgentData {
        private int itemid;
        private String value;
        private int id;
        private long clock;
        private long ns;
    }

    private String session;

}
