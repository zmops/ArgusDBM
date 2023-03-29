package com.zmops.open.manager.pojo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * static count entity
 * @author tom
 * @date 2023/3/29 14:48
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaticCount {

	private String key;

	private long count;
}
