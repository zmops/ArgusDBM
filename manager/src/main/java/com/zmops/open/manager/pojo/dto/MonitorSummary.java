package com.zmops.open.manager.pojo.dto;

import com.zmops.open.common.entity.manager.Monitor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

/**
 * @author tom
 * @date 2023/4/11 22:34
 */
@Data
@Builder
public class MonitorSummary {
	private Monitor monitor;

	private Map<String, String> metrics;
}
