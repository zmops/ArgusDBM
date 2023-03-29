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

package com.zmops.open.manager.controller;

import com.zmops.open.alert.dto.AlertSummary;
import com.zmops.open.alert.service.AlertService;
import com.zmops.open.common.entity.dto.Message;
import com.zmops.open.manager.pojo.dto.AppCount;
import com.zmops.open.manager.pojo.dto.Dashboard;
import com.zmops.open.manager.pojo.dto.StaticCount;
import com.zmops.open.manager.service.MonitorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * System Summary Statistics API
 * 系统摘要统计API
 * @author tom
 * @date 2021/12/7 15:57
 */
@Tag(name = "Summary Statistics API | 系统摘要统计API")
@RestController
@RequestMapping(path = "/api/summary", produces = {APPLICATION_JSON_VALUE})
public class SummaryController {

    @Autowired
    private MonitorService monitorService;

    @Autowired
    private AlertService alertService;

    @GetMapping
    @Operation(summary = "Query all application category monitoring statistics", description = "查询所有应用类别监控统计信息")
    public ResponseEntity<Message<Dashboard>> appMonitors() {
        List<AppCount> appsCount = monitorService.getAllAppMonitorsCount();
        Message<Dashboard> message = new Message<>(new Dashboard(appsCount));
        return ResponseEntity.ok(message);
    }

    @GetMapping("/static")
    @Operation(summary = "Query summary statistics", description = "查询统计数值信息")
    public ResponseEntity<Message<List<StaticCount>>> summaryStatic() {
        AlertSummary alertSummary = alertService.getAlertsSummary();
        List<AppCount> appsCount = monitorService.getAllAppMonitorsCount();
        List<StaticCount> staticCounts = new LinkedList<>();
        StaticCount.StaticCountBuilder countBuilder = StaticCount.builder();
        staticCounts.add(countBuilder.key("static.alert.not_deal")
                .count(alertSummary.getTotal() - alertSummary.getDealNum()).build());
        long monitorTotal = 0;
        long onlineTotal = 0;
        long offlineTotal = 0;
        long unManageTotal = 0;
        long mysqlTotal = 0;
        long postgresqlTotal = 0;
        long oracleTotal = 0;
        for (AppCount appCount : appsCount) {
            monitorTotal += appCount.getSize();
            onlineTotal += appCount.getAvailableSize();
            offlineTotal += appCount.getUnAvailableSize() + appCount.getUnReachableSize();
            unManageTotal += appCount.getUnManageSize();
            if ("mysql".equals(appCount.getApp())) {
                mysqlTotal += appCount.getSize();
            }
            if ("oracle".equals(appCount.getApp())) {
                oracleTotal += appCount.getSize();
            }
            if ("postgresql".equals(appCount.getApp())) {
                postgresqlTotal += appCount.getSize();
            }
        }
        staticCounts.add(countBuilder.key("static.monitor.total").count(monitorTotal).build());
        staticCounts.add(countBuilder.key("static.monitor.online").count(onlineTotal).build());
        staticCounts.add(countBuilder.key("static.monitor.offline").count(offlineTotal).build());
        staticCounts.add(countBuilder.key("static.monitor.un_manage").count(unManageTotal).build());
        staticCounts.add(countBuilder.key("static.mysql.total").count(mysqlTotal).build());
        staticCounts.add(countBuilder.key("static.postgresql.total").count(postgresqlTotal).build());
        staticCounts.add(countBuilder.key("static.oracle.total").count(oracleTotal).build());
        return ResponseEntity.ok(new Message<>(staticCounts));
    }
}
