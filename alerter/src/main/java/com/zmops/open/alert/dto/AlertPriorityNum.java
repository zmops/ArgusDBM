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
 */

package com.zmops.open.alert.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Number of monitoring level alarms 监控级别告警数量
 *
 * @author tom from <a href="https://github.com/dromara/hertzbeat">hertzbeat</a>
 * @date 2022/3/6 19:52
 */
@Data
@AllArgsConstructor
public class AlertPriorityNum {

    /**
     * Alarm level 告警级别
     */
    private byte priority;

    /**
     * count 数量
     */
    private long num;
}