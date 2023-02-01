package com.zmops.open.manager;

import com.zmops.open.alert.AlerterProperties;
import com.zmops.open.alert.AlerterWorkerPool;
import com.zmops.open.alert.calculate.CalculateAlarm;
import com.zmops.open.alert.controller.AlertDefineController;
import com.zmops.open.alert.controller.AlertDefinesController;
import com.zmops.open.alert.controller.AlertsController;
import com.zmops.open.alert.service.impl.AlertDefineServiceImpl;
import com.zmops.open.alert.service.impl.AlertServiceImpl;
import com.zmops.open.collector.collect.database.JdbcSpiLoader;
import com.zmops.open.collector.collect.http.promethus.PrometheusParseCreater;
import com.zmops.open.collector.collect.strategy.CollectStrategyFactory;
import com.zmops.open.collector.dispatch.CommonDispatcher;
import com.zmops.open.collector.dispatch.DispatchProperties;
import com.zmops.open.collector.dispatch.MetricsCollectorQueue;
import com.zmops.open.collector.dispatch.WorkerPool;
import com.zmops.open.collector.dispatch.entrance.internal.CollectJobService;
import com.zmops.open.collector.dispatch.timer.TimerDispatcher;
import com.zmops.open.collector.dispatch.unit.impl.DataSizeConvert;
import com.zmops.open.common.config.AviatorConfiguration;
import com.zmops.open.common.config.CommonConfig;
import com.zmops.open.common.config.CommonProperties;
import com.zmops.open.common.queue.impl.InMemoryCommonDataQueue;
import com.zmops.open.common.service.TencentSmsClient;
import com.zmops.open.common.support.SpringContextHolder;
import com.zmops.open.warehouse.WarehouseWorkerPool;
import com.zmops.open.warehouse.config.WarehouseProperties;
import com.zmops.open.warehouse.controller.MetricsDataController;
import com.zmops.open.warehouse.store.HistoryIotDbDataStorage;
import com.zmops.open.warehouse.store.HistoryTdEngineDataStorage;
import com.zmops.open.warehouse.store.RealTimeMemoryDataStorage;
import com.zmops.open.warehouse.store.RealTimeRedisDataStorage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * @author <a href="mailto:gcwm99@gmail.com">gcdd1993</a>
 * @version 2.1
 * Created by Musk.Chen on 2023/1/14
 */
class ManagerTest extends AbstractSpringIntegrationTest {

    @Resource
    private ApplicationContext ctx;

    @Test
    void testAutoImport() {
        // test alert module
        assertNotNull(ctx.getBean(AlertDefineServiceImpl.class));
        assertNotNull(ctx.getBean(AlertServiceImpl.class));
        assertNotNull(ctx.getBean(AlertDefineController.class));
        assertNotNull(ctx.getBean(AlerterWorkerPool.class));
        assertNotNull(ctx.getBean(AlerterProperties.class));
        assertNotNull(ctx.getBean(CalculateAlarm.class));
        assertNotNull(ctx.getBean(AlertsController.class));
        assertNotNull(ctx.getBean(AlertDefinesController.class));

        // test collector module
        assertNotNull(ctx.getBean(TimerDispatcher.class));
        assertNotNull(ctx.getBean(CommonDispatcher.class));
        assertNotNull(ctx.getBean(DispatchProperties.class));
        assertNotNull(ctx.getBean(MetricsCollectorQueue.class));
        assertNotNull(ctx.getBean(WorkerPool.class));
        assertNotNull(ctx.getBean(CollectJobService.class));
        assertNotNull(ctx.getBean(JdbcSpiLoader.class));
        assertNotNull(ctx.getBean(PrometheusParseCreater.class));
        assertNotNull(ctx.getBean(DataSizeConvert.class));
        assertNotNull(ctx.getBean(CollectStrategyFactory.class));

        // test common module
        assertNotNull(ctx.getBean(CommonProperties.class));
        assertNotNull(ctx.getBean(CommonConfig.class));
        assertNotNull(ctx.getBean(AviatorConfiguration.class));
        assertNotNull(ctx.getBean(InMemoryCommonDataQueue.class));
        // condition on common.sms.tencent.app-id
        assertThrows(NoSuchBeanDefinitionException.class, () -> ctx.getBean(TencentSmsClient.class));
        assertNotNull(ctx.getBean(SpringContextHolder.class));

        // test warehouse module
        assertNotNull(ctx.getBean(WarehouseProperties.class));
        assertNotNull(ctx.getBean(WarehouseWorkerPool.class));

        // default DataStorage is RealTimeMemoryDataStorage
        assertNotNull(ctx.getBean(RealTimeMemoryDataStorage.class));
        assertThrows(NoSuchBeanDefinitionException.class, () -> ctx.getBean(RealTimeRedisDataStorage.class));
        assertThrows(NoSuchBeanDefinitionException.class, () -> ctx.getBean(HistoryTdEngineDataStorage.class));
        assertThrows(NoSuchBeanDefinitionException.class, () -> ctx.getBean(HistoryIotDbDataStorage.class));

        assertNotNull(ctx.getBean(MetricsDataController.class));
    }

}
