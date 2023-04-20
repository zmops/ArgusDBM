export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

const monitorRouter = {
  path: '/warn',
  component: DEFAULT_LAYOUT,
  redirect: 'noRedirect',
  name: 'Warn',
  meta: {
    title: '告警',
    icon: 'menu-warn',
    active_icon: 'menu-warn-active'
  },
  children: [
    {
      path: 'warnInfo',
      component: () => import('@/pages/warn/warn-info/index'),
      name: 'WarnInfo',
      meta: { title: '告警信息', noCache: true }
    },
    {
      path: 'warnRules',
      component: () => import('@/pages/warn/warn-rules/index'),
      name: 'WarnRules',
      meta: { title: '告警规则', noCache: true }
    },
    {
      path: 'notificationRules',
      component: () => import('@/pages/warn/notify-rules/index'),
      name: 'NotificationRules',
      meta: { title: '通知规则', noCache: true }
    },
    {
      path: 'sysreceiver',
      component: () => import('@/pages/warn/sys-receiver/index'),
      name: 'Sysreceiver',
      meta: { title: '接收人管理', noCache: true }
    }
  ]
};

export default monitorRouter;
