<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoResize"
  />
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import VCharts from 'vue-echarts';

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
});

const renderChart = ref(false);
nextTick(() => {
  renderChart.value = true;
});
</script>

