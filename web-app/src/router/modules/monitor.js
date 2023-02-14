/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const monitorRouter = {
  path: '/monitor',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Monitor',
  meta: {
    title: 'monitor',
    icon: 'example'
  },
  children: [
    {
      path: 'mysql',
      component: () => import('@/views/monitor/mysql/index'),
      name: 'MySql',
      meta: { title: 'Mysql', noCache: true }
    },
    {
      path: 'postgresql',
      component: () => import('@/views/monitor/postgresql/index'),
      name: 'PostgreSql',
      meta: { title: 'postgresql', noCache: true }
    },
    {
      path: 'oracle',
      component: () => import('@/views/monitor/oracle/index'),
      name: 'Oracle',
      meta: { title: 'oracle', noCache: true }
    },
  ]
}

export default monitorRouter
