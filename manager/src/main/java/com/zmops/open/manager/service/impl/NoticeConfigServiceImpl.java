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

package com.zmops.open.manager.service.impl;

import com.zmops.open.common.entity.alerter.Alert;
import com.zmops.open.common.util.CommonConstants;
import com.zmops.open.manager.component.alerter.DispatcherAlarm;
import com.zmops.open.manager.dao.NoticeReceiverDao;
import com.zmops.open.manager.dao.NoticeRuleDao;
import com.zmops.open.common.entity.manager.NoticeReceiver;
import com.zmops.open.common.entity.manager.NoticeRule;
import com.zmops.open.manager.service.NoticeConfigService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 消息通知配置实现
 *
 * @author tom from <a href="https://github.com/dromara/hertzbeat">hertzbeat</a>
 * @date 2021/12/16 16:16
 */
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class NoticeConfigServiceImpl implements NoticeConfigService {

    private static final String ALERT_TEST_TARGET = "Test Target";

    private static final String ALERT_TEST_CONTENT = "test send msg! \n This is the test data. It is proved that it can be received successfully";

    @Autowired
    private NoticeReceiverDao noticeReceiverDao;

    @Autowired
    private NoticeRuleDao noticeRuleDao;

    @Autowired
    @Lazy
    private DispatcherAlarm dispatcherAlarm;

    @Override
    public Page<NoticeReceiver> getNoticeReceivers(Specification<NoticeReceiver> specification, PageRequest pageRequest) {
        return noticeReceiverDao.findAll(specification, pageRequest);
    }

    @Override
    public Page<NoticeRule> getNoticeRules(Specification<NoticeRule> specification, PageRequest pageRequest) {
        return noticeRuleDao.findAll(specification, pageRequest);
    }

    @Override
    public void addReceiver(NoticeReceiver noticeReceiver) {
        noticeReceiverDao.save(noticeReceiver);
    }

    @Override
    public void editReceiver(NoticeReceiver noticeReceiver) {
        noticeReceiverDao.save(noticeReceiver);
    }

    @Override
    public void deleteReceiver(Long receiverId) {
        noticeReceiverDao.deleteById(receiverId);
    }

    @Override
    public void addNoticeRule(NoticeRule noticeRule) {
        noticeRuleDao.save(noticeRule);
    }

    @Override
    public void editNoticeRule(NoticeRule noticeRule) {
        noticeRuleDao.save(noticeRule);
    }

    @Override
    public void deleteNoticeRule(Long ruleId) {
        noticeRuleDao.deleteById(ruleId);
    }

    @Override
    public List<NoticeReceiver> getReceiverFilterRule(Alert alert) {
        // todo use cache   使用缓存
        List<NoticeRule> rules = noticeRuleDao.findNoticeRulesByEnableTrue();

        // The temporary rule is to forward all, and then implement more matching rules: alarm status selection, monitoring type selection, etc.
        // 规则是全部转发, 告警状态选择, 监控类型选择等(按照tags标签和告警级别过滤匹配)
        Map<Long, NoticeRule> filterReceiverMap = rules.stream()
                .filter(rule -> {
                    if (rule.isFilterAll()) {
                        return true;
                    }
                    // filter priorities
                    if (rule.getPriorities() != null && !rule.getPriorities().isEmpty()) {
                        boolean priorityMatch = rule.getPriorities().stream().anyMatch(item -> item != null && item == alert.getPriority());
                        if (!priorityMatch) {
                            return false;
                        }
                    }
                    // filter tags
                    if (rule.getTags() != null && !rule.getTags().isEmpty()) {
                        return rule.getTags().stream().anyMatch(tagItem -> {
                            if (!alert.getTags().containsKey(tagItem.getName())) {
                                return false;
                            }
                            String alertTagValue = alert.getTags().get(tagItem.getName());
                            return Objects.equals(tagItem.getValue(), alertTagValue);
                        });
                    }
                    return true;
                })
                .collect(Collectors.toMap(NoticeRule::getReceiverId, item -> item));
        List<NoticeReceiver> receivers = noticeReceiverDao.findAllById(filterReceiverMap.keySet());
        for (NoticeReceiver receiver : receivers) {
            NoticeRule rule = filterReceiverMap.get(receiver.getId());
            receiver.setType(rule.getType());
        }
        return receivers;
    }

    @Override
    public NoticeReceiver getReceiverById(Long receiverId) {
        return noticeReceiverDao.findById(receiverId).orElse(null);
    }

    @Override
    public NoticeRule getNoticeRulesById(Long ruleId) {
        return noticeRuleDao.findById(ruleId).orElse(null);
    }

    @Override
    public boolean sendTestMsg(NoticeReceiver noticeReceiver) {
        Alert alert = new Alert();
        alert.setTarget(ALERT_TEST_TARGET);
        alert.setContent(ALERT_TEST_CONTENT);
        alert.setTimes(1);
        alert.setFirstTriggerTime(System.currentTimeMillis());
        alert.setLastTriggerTime(System.currentTimeMillis());
        alert.setPriority(CommonConstants.ALERT_PRIORITY_CODE_CRITICAL);
        return dispatcherAlarm.sendNoticeMsg(noticeReceiver, alert);
    }
}
