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

package com.zmops.open.manager.dao;

import com.zmops.open.common.entity.manager.NoticeRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Set;

/**
 * NoticeRule数据库操作
 * @author tom from <a href="https://github.com/dromara/hertzbeat">hertzbeat</a>
 * @date 2021/12/16 16:13
 */
public interface NoticeRuleDao extends JpaRepository<NoticeRule, Long>, JpaSpecificationExecutor<NoticeRule> {

    /**
     * 查询所有已启用的通知策略
     * @return 通知策略
     */
    List<NoticeRule> findNoticeRulesByEnableTrue();

    /**
     * 根据IDS删除
     * @param ids ids
     */
    void deleteNoticeRulesByIdIn(Set<Long> ids);
}
