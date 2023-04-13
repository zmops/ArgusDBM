<template>
  <main class="h-[100vh] w-[100vw]" text=" gray-700 dark:gray-200">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </main>
</template>

<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { getLocale } from './locales';

import { isDark } from './composables';

const currentLocale = getLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh':
      return zhCN;
    case 'en':
      return enUS;
    default:
      return enUS;
  }
});
</script>

