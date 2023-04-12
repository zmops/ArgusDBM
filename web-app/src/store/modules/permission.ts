import { defineStore } from 'pinia';
import type { routerState } from '../types';
import { asyncRoutes, constantRoutes } from '@/router';
// import { routes as constantRoutes } from '@/router';

function hasPermission(roles: string[], route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any[], roles: string[]) {
  const res: any[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permissionStore = defineStore('permission', {
  state: (): routerState=>({
    routes: [],
    addRoutes: []
  }),
  getters: {
    getRoutes(state: routerState) {
      return state.routes;
    },
    getAddRoutes(state: routerState) {
      return state.addRoutes;
    }
  },

  actions: {
    generateRoutes(roles: string[]) {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }

      this.addRoutes = accessedRoutes;
      this.routes = constantRoutes.concat(accessedRoutes);

      return Promise.resolve(accessedRoutes);
    }
  }
});

export default permissionStore;
