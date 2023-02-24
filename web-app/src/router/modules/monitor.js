/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const monitorRouter = {
  path: '/monitor',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Monitor',
  meta: {
    title: 'monitor',
    icon: 'menu_monitor',
    active_icon: 'menu_monitor_active'
  },
  children: [
    {
      path: 'mysql',
      component: () => import('@/views/monitor/mysql/index'),
      name: 'MySql',
      meta: { title: 'MySQL', noCache: true }
    },
    {
      path: 'mysqlDetail',
      component: () => import('@/views/monitor/detail/index'),
      name: 'MySqlDetail',
      hidden: true,
      meta: { noCache: true, activeMenu: '/monitor/mysql' }
    },
    {
      path: 'postgresql',
      component: () => import('@/views/monitor/postgresql/index'),
      name: 'PostgreSql',
      meta: { title: 'PostgreSQL', noCache: true }
    },
    {
      path: 'postgresqlDetail',
      component: () => import('@/views/monitor/detail/index'),
      name: 'PostgreSqlDetail',
      hidden: true,
      meta: { noCache: true, activeMenu: '/monitor/postgresql' }
    },
    {
      path: 'oracle',
      component: () => import('@/views/monitor/oracle/index'),
      name: 'Oracle',
      meta: { title: 'Oracle', noCache: true }
    },
    {
      path: 'oracleDetail',
      component: () => import('@/views/monitor/detail/index'),
      name: 'OracleDetail',
      hidden: true,
      meta: { noCache: true, activeMenu: '/monitor/oracle' }
    }
  ]
}

export default monitorRouter
