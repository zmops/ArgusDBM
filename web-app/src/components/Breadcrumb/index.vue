<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in routers" :key="item.path">
      {{ item.meta.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  items: {
    type: Array as PropType<string[]>,
    default() {
      return [];
    },
  },
});
const router = useRouter();
// 当前路由的匹配记录
console.log(router.currentRoute.value.matched);

const routers = computed(()=>{
  // 过滤掉没有meta的
  console.log( router.currentRoute.value.matched.filter(item=>item.meta.title));

  return router.currentRoute.value.matched.filter(item=>item.meta.title);
});
</script>

<style scoped lang="scss">
  .container-breadcrumb {
    margin: 16px 0;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
