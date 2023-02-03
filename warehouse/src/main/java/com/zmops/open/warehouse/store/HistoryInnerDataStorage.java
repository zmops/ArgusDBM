package com.zmops.open.warehouse.store;

import com.zmops.open.common.entity.dto.Value;
import com.zmops.open.common.entity.message.CollectRep;
import com.zmops.open.common.entity.warehouse.History;
import com.zmops.open.common.queue.CommonDataQueue;
import com.zmops.open.common.util.CommonConstants;
import com.zmops.open.warehouse.WarehouseWorkerPool;
import com.zmops.open.warehouse.config.WarehouseProperties;
import com.zmops.open.warehouse.dao.HistoryDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * data storage by mysql/h2 - jpa
 *
 * @author tom
 * @since 2023/02/03
 */
@Component
@ConditionalOnProperty(prefix = "warehouse.store.inner",
        name = "enabled", havingValue = "true")
@Slf4j
public class HistoryInnerDataStorage extends AbstractHistoryDataStorage {
    private HistoryDao historyDao;

    public HistoryInnerDataStorage(WarehouseWorkerPool workerPool,
                                   WarehouseProperties properties,
                                   HistoryDao historyDao,
                                   CommonDataQueue commonDataQueue) {
        super(workerPool, properties, commonDataQueue);

        this.serverAvailable = true;
        this.historyDao = historyDao;
        this.startStorageData("warehouse-inner-data-storage", isServerAvailable());
    }

    @Override
    void saveData(CollectRep.MetricsData metricsData) {
        if (metricsData.getCode() != CollectRep.Code.SUCCESS) {
            return;
        }
        if (metricsData.getValuesList().isEmpty()) {
            log.info("[warehouse inner] flush metrics data {} is null, ignore.", metricsData.getId());
            return;
        }
        String monitorType = metricsData.getApp();
        String metrics = metricsData.getMetrics();
        List<CollectRep.Field> fieldsList = metricsData.getFieldsList();
        try {
            List<History> historyList = new LinkedList<>();
            History.HistoryBuilder historyBuilder = History.builder()
                    .monitorId(metricsData.getId())
                    .monitorType(monitorType)
                    .metrics(metrics)
                    .time(metricsData.getTime());
            for (CollectRep.ValueRow valueRow : metricsData.getValuesList()) {
                String instance = valueRow.getInstance();
                if (!instance.isEmpty()) {
                    instance = String.format("\"%s\"", instance);
                    historyBuilder.instance(instance);
                } else {
                    historyBuilder.instance(null);
                }
                for (int i = 0; i < fieldsList.size(); i++) {
                    CollectRep.Field field = fieldsList.get(i);
                    historyBuilder.metric(field.getName());
                    if (!CommonConstants.NULL_VALUE.equals(valueRow.getColumns(i))) {
                        if (fieldsList.get(i).getType() == CommonConstants.TYPE_NUMBER) {
                            historyBuilder.metricType(CommonConstants.TYPE_NUMBER)
                                            .dou(Double.parseDouble(valueRow.getColumns(i)));
                        } else if (fieldsList.get(i).getType() == CommonConstants.TYPE_STRING) {
                            historyBuilder.metricType(CommonConstants.TYPE_STRING)
                                    .str(valueRow.getColumns(i));
                        }
                    } else {
                        if (fieldsList.get(i).getType() == CommonConstants.TYPE_NUMBER) {
                            historyBuilder.metricType(CommonConstants.TYPE_NUMBER).dou(null);
                        } else if (fieldsList.get(i).getType() == CommonConstants.TYPE_STRING) {
                            historyBuilder.metricType(CommonConstants.TYPE_STRING).str(null);
                        }
                    }
                }
                historyList.add(historyBuilder.build());
            }
            historyDao.saveAll(historyList);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    @Override
    public Map<String, List<Value>> getHistoryMetricData(Long monitorId, String app, String metrics, String metric, String instance, String history) {
        Map<String, List<Value>> instanceValuesMap = new HashMap<>(8);
        return instanceValuesMap;
    }


    @Override
    public Map<String, List<Value>> getHistoryIntervalMetricData(Long monitorId, String app, String metrics, String metric, String instance, String history) {
        Map<String, List<Value>> instanceValuesMap = new HashMap<>(8);
        return instanceValuesMap;
    }

    @Override
    public void destroy() throws Exception {

    }
}
