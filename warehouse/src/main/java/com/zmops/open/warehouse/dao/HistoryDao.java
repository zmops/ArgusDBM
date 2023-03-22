package com.zmops.open.warehouse.dao;

import com.zmops.open.common.entity.warehouse.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * history entity dao
 * @author tom
 * @date 2023/2/3 15:01
 */
public interface HistoryDao extends JpaRepository<History, Long>, JpaSpecificationExecutor<History> {

    /**
     * delete history before expireTime
     * @param expireTime expireTime
     * @return rows deleted
     */
    @Modifying
    @Transactional(rollbackFor = Exception.class)
    int deleteHistoriesByTimeBefore(Long expireTime);

    /**
     * delete older history record
     * @return rows deleted
     */
    @Modifying
    @Transactional(rollbackFor = Exception.class)
    @Query(value = "delete from history limit 20000", nativeQuery = true)
    int deleteOlderHistoriesRecord();

    /**
     * truncateTable
     */
    @Modifying
    @Transactional(rollbackFor = Exception.class)
    @Query(value = "TRUNCATE TABLE history", nativeQuery = true)
    void truncateTable();
}
