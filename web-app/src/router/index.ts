import type { RouteRecordRaw } from 'vue-router';
import { createWebHashHistory, createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import MonitorRouter from './modules/monitor';
import warnRouter from './modules/warn';
import { WHITE_LIST } from './constants';
import getTitle from '@/utils/getTitle';
import { permissionStore, useUserStore } from '@/store';
import { setRouteEmitter } from '@/utils/route-listener';

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

export const asyncRoutes = [
  MonitorRouter,
  warnRouter,
];
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: DEFAULT_LAYOUT,
    redirect: '/dashboard',
    meta: { title: '概览', icon: 'menu-overview', active_icon: 'menu-overview-active', affix: true, hideChildrenInMenu: true },
    name: 'Dashboard',

    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/overview/index'),
        name: 'Dashboard',

      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  document.title = getTitle(to.meta.title as string);

  setRouteEmitter(to);

  const token = useToken.get();

  // already logged router to index page
  if (token && to.path === '/login') {
    next({ path: '/' });
    return;
  }
  if (!token) {
    if (WHITE_LIST.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    return;
  }

  const userStore = useUserStore();
  const permission = permissionStore();
  const userInfo = userStore.userInfo;
  const hasRoles = userInfo?.roles && userInfo?.roles.length > 0;

  if (hasRoles) {
    next();
  } else {
    try {
      const userInfo = await userStore.getUserInfo();
      const accessRoutes = await permission.generateRoutes(userInfo.roles || []) as unknown as RouteRecordRaw[];
      accessRoutes.forEach((accessRoute) => {
        router.addRoute(accessRoute);
      });
      next({ ...to, replace: true });
    } catch {
      await userStore.logout();
      next({ name: 'Login', query: { redirect: to.path } });
    }
  }

});

router.afterEach(() => {
  NProgress.done();
});

export default router;
