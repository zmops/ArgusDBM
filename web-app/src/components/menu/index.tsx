import { defineComponent, ref, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import useMenuTree from './use-menu-tree';
import { listenerRouteChange } from '@/utils/route-listener';
import { openWindow, regexUrl } from '@/utils';

const menuIcons = {
  'menu-overview': 'i-custom:menu-overview',
  'menu-monitor': 'i-custom:menu-monitor',
  'menu-warn': 'i-custom:menu-warn'
};

export default defineComponent({
  emit: ['collapse'],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['collapse'],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const { menuTree } = useMenuTree();
    const topMenu = ref(false);
    const openKeys = ref<string[]>([]);
    const selectedKey = ref<string[]>(['/', 'Dashboard']);

    const getI18nName = (item) =>{
      const str = 'route.' + item?.meta?.title;
      if (te(str)) {
        return t(str);
      }
      return item?.meta?.title || item.name;
    };

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path);
        selectedKey.value = [item.name as string];
        return;
      }
      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta as RouteMeta;
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string];
        return;
      }
      // Trigger router change
      router.push({
        name: item.name,
      });
    };
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = [];
      let isFind = false;
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true;
          result.push(...keys);
          return;
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string]);
          });
        }
      };
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) { return; } // Performance optimization
        backtrack(el, [el.name as string]);
      });
      return result;
    };
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys(
          (activeMenu || newRoute.name) as string
        );

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        openKeys.value = [...keySet];

        selectedKey.value = [
          activeMenu as string || menuOpenKeys[menuOpenKeys.length - 1],
        ];
      }
    }, true);
    const setCollapse = (val: boolean) => {
      emit('collapse', val);
    };

    const renderSubMenu = () => {
      function travel(_route: any[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            const iconEle = element?.meta?.icon
              ? () => h('i', {
                // @ts-expect-error
                  class: menuIcons[element?.meta?.icon]
                })
              : null;

            const node
              = (element?.children && element?.children.length !== 0) ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{ icon: iconEle, title: () => h('span', getI18nName(element)) }}
                >
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  key={element?.name}
                  v-slots={{ icon: iconEle }}
                  onClick={() => goto(element)}
                >
                  {getI18nName(element)}
                </a-menu-item>
              );
            nodes.push(node as never);
          });
        }
        return nodes;
      }
      return travel(menuTree.value);
    };

    return () => (
      <a-menu
        mode={topMenu.value ? 'horizontal' : 'vertical'}
        collapsed={props.collapsed}
        show-collapse-button={true}
        theme="dark"
        auto-open={true}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        class="flex-1"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  },
});
