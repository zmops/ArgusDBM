/**
 * 全局常量
 */

/* 监控状态 */
export const MONITORS_STATUS = [
  { key: [0, 1, 2, 3].join('_'), value: t('tableView.all') },
  { key: [1].join('_'), value: t('tableView.enable') },
  { key: [0].join('_'), value: t('tableView.disable') },
  { key: [2, 3].join('_'), value: t('tableView.offline') },
];

/* 告警等级 */
export const WARN_LEVEL = [
  { key: -1, value: t('tableView.all') },
  { key: 2, value: t('alert.priority.0'), num: 0, icon: 'alarm' },
  { key: 1, value: t('alert.priority.1'), num: 0, icon: 'ordinary' },
  { key: 0, value: t('alert.priority.2'), num: 0, icon: 'prompt' }
];
/* 告警等级 */
export const ALARM_HANDLES = [
  { key: -1, value: t('tableView.all') },
  { key: 3, value: t('alert.status.3') },
  { key: 2, value: t('alert.status.2') },
  { key: 0, value: t('alert.status.0') }
];
/* 通知方式 */
export const NOTICE_TYPE = [
  { key: 0, value: t('sysReceiver.form.phone') },
  { key: 1, value: t('sysReceiver.form.email') },
  { key: 4, value: t('sysReceiver.form.wechatId') },
  { key: 5, value: t('sysReceiver.form.accessToken') },
  { key: 2, value: t('sysReceiver.form.hookUrl') }
];
