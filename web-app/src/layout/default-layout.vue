<template>
  <a-layout class="w-full w-full flex flex-nowrap overflow-hidden">
    <a-layout-sider
      class="h-100vh flex-shrink-0" breakpoint="xl" :collapsed="collapsed" :collapsible="true" :hide-trigger="true" :width="menuWidth"
      @collapse="setCollapsed"
    >
      <div class="h-full flex flex-col overflow-auto overflow-x-hidden">
        <div class="w-full flex flex-nowrap items-center justify-center bg-#232324 py-2 color-#ccc">
          <img
            alt="logo"
            :src="logo"
          />
          <span
            v-if="!collapsed"
            class="ml-2 truncate text-18px color-[rbg(201,205,212)]"
          >
            Argus DBM
          </span>
        </div>
        <Menu :collapsed="collapsed" @collapse="setCollapsed" />
      </div>
    </a-layout-sider>
    <div class="ma-0 h-100vh w-full column flex-1 overflow-hidden pa-0">
      <div class="w-full flex-shrink-0">
        <NavBar />
      </div>
      <div class="flex-1 overflow-y-auto">
        <PageLayout />
        <!--        <Footer />  -->
      </div>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
import PageLayout from './page-layout.vue';
import NavBar from '@/components/navbar/index.vue';
import Menu from '@/components/menu/index';
// import Footer from '@/components/footer/index.vue';
import logo from '@/assets/logo.svg';

const isInit = ref(false);

const drawerVisible = ref(false);
const collapsed = ref(false);

provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value;
});

const menuWidth = computed(() => {
  return collapsed.value ? 48 : 220;
});
onMounted(() => {
  isInit.value = true;
});
const setCollapsed = (val: boolean) => {
  collapsed.value = val;
};
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
}

.layout-sider::after {
  position: absolute;
  top: 0;
  right: -1px;
  display: block;
  width: 1px;
  height: 100%;
  background-color: var(--color-border);
  content: '';
}

.layout-sider> :deep(.arco-layout-sider-children) {
  overflow-y: hidden;
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.menu-wrapper :deep(.arco-menu) ::-webkit-scrollbar {
  width: 12px;
  height: 4px;
}

.menu-wrapper :deep(.arco-menu) ::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 7px;
  background-color: var(--color-text-4);
}

.menu-wrapper :deep(.arco-menu) ::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-3);
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
