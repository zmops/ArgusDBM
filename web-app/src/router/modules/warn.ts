export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

const monitorRouter = {
  path: '/warn',
  component: DEFAULT_LAYOUT,
  redirect: 'noRedirect',
  name: 'Warn',
  meta: {
    title: 'warn',
    icon: 'menu-warn',
    active_icon: 'menu-warn-active'
  },
  children: [
    {
      path: 'warnInfo',
      component: () => import('@/pages/warn/warn-info/index'),
      name: 'WarnInfo',
      meta: { title: 'warnInfo', noCache: true }
    },
    {
      path: 'warnRules',
      component: () => import('@/pages/warn/warn-rules/index'),
      name: 'WarnRules',
      meta: { title: 'warnRules', noCache: true }
    },
    {
      path: 'notificationRules',
      component: () => import('@/pages/warn/notify-rules/index'),
      name: 'NotificationRules',
      meta: { title: 'notificationRules', noCache: true }
    },
    {
      path: 'sysreceiver',
      component: () => import('@/pages/warn/sys-receiver/index'),
      name: 'Sysreceiver',
      meta: { title: 'sysreceiver', noCache: true }
    }
  ]
};

export default monitorRouter;
