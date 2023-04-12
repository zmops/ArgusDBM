import { computed } from 'vue';
import type { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import cloneDeep from 'lodash/cloneDeep';
import { permissionStore } from '@/store';

export default function useMenuTree() {

  const permission = permissionStore();

  const menuTree = computed(() => {
    const copyRouter = cloneDeep(permission.getRoutes || []) as RouteRecordNormalized[];

    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) { return null; }

      const collector: any = _routes.map((element) => {

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          x => x.meta?.hidden !== true
        );

        // Associated child node
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hidden === true) {
          return null;
        }

        return null;
      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter, 0);
  });

  return {
    menuTree,
  };
}
