package com.zmops.open.warehouse.dao;

import com.zmops.open.common.entity.warehouse.History;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * history entity dao
 * @author tom
 * @date 2023/2/3 15:01
 */
public interface HistoryDao extends JpaRepository<History, Long> {


}
