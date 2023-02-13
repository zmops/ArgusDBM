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

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

/**
 * @author nantian  Zabbix protocol type
 */
@Data
public class ZabbixResponse {

    /**
     * Protocol type
     */
    private ZabbixProtocolType type;

    private List<ActiveChecks> activeChecks;

    private AgentData agentData;

    @Data
    @Builder
    public static class ActiveChecks {
        private String key;
        private int delay;
        private int mtime;
        private int lastlogsize;
    }

    @Getter
    @Builder
    public static class AgentData {
        private String info;
    }
}
