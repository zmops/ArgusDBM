package com.zmops.open.collector.dispatch.entrance.zabbix.agent;

import com.zmops.open.collector.dispatch.entrance.internal.CollectJobService;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixProtocolType;
import com.zmops.open.collector.dispatch.entrance.zabbix.protocol.bean.ZabbixResponse;
import com.zmops.open.common.entity.job.Configmap;
import com.zmops.open.common.entity.job.Job;
import com.zmops.open.common.entity.job.Metrics;
import com.zmops.open.common.service.AppDefineHouse;
import com.zmops.open.common.support.SpringContextHolder;
import com.zmops.open.common.util.GsonUtil;
import com.zmops.open.common.util.SnowFlakeIdGenerator;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author nantian  Zabbix protocol type
 */
@Slf4j
public class TcpClientHandler extends SimpleChannelInboundHandler<ZabbixResponse> {

    private CollectJobService collectJobService;
    private Set<Long> runningJobs;

    public TcpClientHandler() {
        this.collectJobService = SpringContextHolder.getBean(CollectJobService.class);
        this.runningJobs = new HashSet<>(8);
    }

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, ZabbixResponse response) throws Exception {
        if (response != null && response.getType() == ZabbixProtocolType.ACTIVE_CHECKS
                && response.getActiveChecks() != null) {
            runningJobs.forEach(jobId -> {
                collectJobService.cancelAsyncCollectJob(jobId);
            });
            runningJobs.clear();
            for (ZabbixResponse.ActiveChecks metric : response.getActiveChecks()) {
                try {
                    Map<String, String> paramsMap = metric.getParamsMap();
                    if (paramsMap.isEmpty()) {
                        continue;
                    }
                    // 构造采集任务Job实体
                    Job appDefine = AppDefineHouse.getAppDefine(paramsMap.get(ZabbixResponse.APP));
                    appDefine = GsonUtil.fromJson(GsonUtil.toJson(appDefine), Job.class);
                    long jobId = SnowFlakeIdGenerator.generateId();
                    appDefine.setId(jobId);
                    // set itemId 10000 - 99999  in monitorId
                    appDefine.setMonitorId(metric.getItemid());
                    appDefine.setInterval(30);
                    appDefine.setCyclic(true);
                    appDefine.setTimestamp(System.currentTimeMillis());
                    List<Configmap> configmaps = appDefine.getConfigmap().stream().peek(config -> {
                        String value = paramsMap.get(config.getKey());
                        config.setValue(value);
                    }).collect(Collectors.toList());
                    appDefine.setConfigmap(configmaps);
                    // filter metric
                    List<Metrics> metrics = appDefine.getMetrics().stream().filter(item ->
                            item.getName().equals(paramsMap.get(ZabbixResponse.METRICS)))
                            .peek(item -> item.setPriority((byte) 0))
                            .collect(Collectors.toList());
                    if (metrics.isEmpty()) {
                        continue;
                    }
                    appDefine.setMetrics(metrics);
                    // 下发采集任务
                    collectJobService.addAsyncCollectJob(appDefine);
                    runningJobs.add(jobId);
                } catch (Exception e) {
                    log.error("add zabbix monitor job error {}", e.getMessage(), e);
                }
            }
        }
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        super.channelActive(ctx);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
