/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const monitorRouter = {
  path: '/warn',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Warn',
  meta: {
    title: 'warn',
    icon: 'example'
  },
  children: [
    {
      path: 'warnInfo',
      component: () => import('@/views/warn/warn-info/index'),
      name: 'WarnInfo',
      meta: { title: 'warnInfo', noCache: true }
    },
    {
      path: 'warnRules',
      component: () => import('@/views/warn/warn-rules/index'),
      name: 'WarnRules',
      meta: { title: 'warnRules', noCache: true }
    },
    {
      path: 'notificationRules',
      component: () => import('@/views/warn/notification-rules/index'),
      name: 'NotificationRules',
      meta: { title: 'notificationRules', noCache: true }
    },
    {
      path: 'sysreceiver',
      component: () => import('@/views/warn/sys-receiver/index'),
      name: 'Sysreceiver',
      meta: { title: 'sysreceiver', noCache: true }
    },
  ]
}

export default monitorRouter
