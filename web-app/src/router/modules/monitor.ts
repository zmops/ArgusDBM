export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

const monitorRouter = {
  path: '/monitor',
  component: DEFAULT_LAYOUT,
  redirect: 'noRedirect',
  name: 'Monitor',
  meta: {
    title: 'monitor',
    icon: 'menu-monitor',
    active_icon: 'menu-monitor-active'
  },
  children: [
    {
      path: 'mysql',
      component: () => import('@/pages/monitor/mysql/index'),
      name: 'MySql',
      meta: { title: 'MySQL', noCache: true }
    },
    {
      path: 'monitorDetail',
      component: () => import('@/pages/monitor/detail/detail.vue'),
      name: 'monitorDetail',
      meta: { noCache: true, hidden: true }
    },
    {
      path: 'postgresql',
      component: () => import('@/pages/monitor/postgresql/index'),
      name: 'PostgreSql',
      meta: { title: 'PostgreSQL', noCache: true }
    },
    {
      path: 'oracle',
      component: () => import('@/pages/monitor/oracle/index'),
      name: 'Oracle',
      meta: { title: 'Oracle', noCache: true }
    },
    {
      path: 'dameng',
      component: () => import('@/pages/monitor/dameng/index'),
      name: '达梦',
      meta: { title: '达梦', noCache: true }
    },
  ]
};

export default monitorRouter;
