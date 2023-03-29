/**
 * 全局常量
 */

/* 监控状态 */
export const MONITORS_STATUS = [
  { key: 9, value: '全部' },
  { key: 0, value: '未监控' },
  { key: 1, value: '可用' },
  { key: 2, value: '不可用' },
  { key: 3, value: '不可达' },
  { key: 4, value: '挂起' }
]

/* 告警等级 */
export const WARN_LEVEL = [
  { key: 2, value: '紧急告警', num: 0, icon: 'alarm' },
  { key: 1, value: '严重告警', num: 0, icon: 'ordinary' },
  { key: 0, value: '警告告警', num: 0, icon: 'prompt' }
]
/* 告警等级 */
export const ALARM_HANDLES = [
  { key: 3, value: '已处理' },
  { key: 2, value: '已恢复' },
  { key: 0, value: '未处理' }
]
/* 通知方式 */
export const NOTICE_TYPE = [
  { key: 0, value: '短信' },
  { key: 1, value: '邮件' },
  { key: 4, value: '企业微信' },
  { key: 5, value: '钉钉' },
  { key: 2, value: 'WebHook' }
]
