import { request } from '../request';
import type { AlertSummary, ApiAlertDefine, loginParams, SummaryStatic, SummaryStaticResponse, sysInterface } from './interface';

export function login<T>(data: loginParams) {
  return request.post<T>('/api/account/auth/form', data);
}

export function getUserInfo<T>() {
  return request.get<T>('/api/user');
}

export function getSummaryStatic() {
  return request.get<SummaryStaticResponse>(
    '/api/summary/static',
  );
}

export function getAlerts<T extends Record<string, any>>(query = {}) {
  return request.get<T>(
    '/api/alerts',
    query
  );
}

// 获取告警统计信息
export function getAlertsSummary() {
  return request.get<AlertSummary>('/api/alerts/summary');
}

export function getSummary() {
  return request.get<SummaryStatic>(
    '/api/summary',
  );
}

// 根据查询过滤项获取监控信息列表
export function getMonitors(query = {}) {
  return request.get<Record<string, any>>('/api/monitors', query);
}

export function getAppParams(app: string) {
  return request.get('/api/apps/' + app + '/params');
}

// 新增一个监控应用
export function addMonitor(data) {
  return request.post('/api/monitor', data);
}
// 获取一个应用详情
export function getMonitor(id: string | number) {
  return request.get('/api/monitor/' + id);
}
// 修改一个已存在监控应用
export function modifyMonitor(data) {
  return request.put('/api/monitor', data);
}

export function delMonitors(ids: Array<string | number>) {
  return request.delete('/api/monitors', { ids: ids.join(',') });

}

// 监控详情-查询最新数据
export function getLatestValue(monitorId: string, metrics: string) {
  return request.get(`/api/monitor/${monitorId}/metrics/${metrics}`);
}
// 监控详情-查询历史数据
export function getHistoryValue(monitorId: string, metricFull: string) {
  return request.get(`/api/monitor/${monitorId}/metric/${metricFull}`);
}
export function getDefines<T extends Record<string, any>>(query = {}) {
  return request.get<T>('/api/alert/defines', query);
}
// 查询所有监控的类型-指标组-指标层级,以层级结构输出
export function getHierarchy() {
  return request.get('/api/apps/hierarchy');
}

// Added an alarm definition | 新增一个告警定义
export function addDefine(data) {
  return request.post('/api/alert/define', data);
}

// Modify an existing alarm definition | 修改一个已存在告警定义
export function modifyDefine(data) {
  return request.put<ApiAlertDefine>('/api/alert/define', data);
}
export function getDefine(id) {
  return request.get<ApiAlertDefine>('/api/alert/define/' + id);
}
// 清空所有告警信息
export function clearAlerts() {
  return request.delete('/api/alerts/clear');
}

export function putStatus(status, ids) {
  return request.put('/api/alerts/status/' + status + '?ids=' + ids.join(','));
}

// Applies the association between specified alarm definitions and monitoring ｜ 应用指定告警定义与监控关联关系
export function getAlertDefineMonitors(alertDefineId) {
  return request.get('/api/alert/define/' + alertDefineId + '/monitors');
}

export function appliesMonitors(alertDefineId, data) {
  return request.post('/api/alert/define/' + alertDefineId + '/monitors', data);
}
// 新增一个接收人
export function addReceiver(data) {
  return request.post('/api/notice/receiver', data);
}

// 修改已存在的接收人信息
export function modifyReceiver(data) {
  return request.put('/api/notice/receiver', data);
}
export function getReceivers(params) {
  return request.get<{ content: sysInterface[]; totalElements: number }>('/api/notice/receivers/', params);
}
export function getReceiver(id) {
  return request.get<{ data: sysInterface }>('/api/notice/receiver/' + id);
}
// 根据条件获取标签信息
export function getTags<T extends Record<string, any>>(query) {
  return request.get<T>('/api/tag', query);
}

// 根据查询过滤项获取消息通知策略列表
export function getRules<T extends Record<string, any>>(query) {
  return request.get<T>('/api/notice/rules', query);
}

// 查询已存在的通知策略信息
export function getRule(id) {
  return request.get('/api/notice/rule/' + id);
}

// 新增一个通知策略
export function addRule(data) {
  return request.post('/api/notice/rule', data);
}

// 修改已存在的通知策略信息
export function modifyRule(data) {
  return request.put( '/api/notice/rule', data);
}

// 删除已存在的通知策略信息
export function delRules(ids) {
  return request.delete('/api/notice/rules', { ids: ids.join(',') });
}
// 删除已存在的接收人信息
export function delReceivers(ids) {
  return request.delete('/api/notice/receivers', { ids: ids.join(',') });
}
// 根据告警ID列表批量删除告警
export function delAlerts(ids) {
  return request.delete('/api/alerts', { ids: ids.join(',') });
}
// If the alarm definition does not exist, the alarm is deleted successfully ｜ 根据告警定义ID删除告警定义,告警定义不存在也是删除成功
export function delDefine(id) {
  return request.delete('/api/alert/define/' + id);
}
