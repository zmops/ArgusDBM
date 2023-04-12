<!-- 详情页最新值+趋势图组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <div class="text-chart">
        <LineChart :target-name="targetName" />
        <div class="text">
          {{ val }}
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import GridItemStyle from './gridItem-style.vue';
import LineChart from '@/components/detail-compts/LineChart.vue';
import { getTargetData } from '@/utils/detail';

export default {
  name: 'SingleGraph',
  components: {
    GridItemStyle,
    LineChart
  },
  props: {
    /* 指标类型('单指标/指标组合') */
    targetType: {
      type: String,
      default: '单指标'
    },
    /* 指标名称 */
    targetName: {
      type: String,
      default: ''
    },
    /* 最新数据对象 */
    dataObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  setup(props) {
    const { targetType, targetName, dataObj } = toRefs(props);
    const val = ref('');
    watch(dataObj, (v) => {
      const name = targetName.value.split('.');
      const item = v[name[2]];
      if (item) {
        val.value = item.value + item.unit;
      }
    }, { immediate: true, deep: true });
    const info = ref({});
    onMounted(() => {
      info.value = getTargetData(targetType.value, targetName.value);
    });
    return {
      info,
      val
    };
  }

};
</script>

<style lang="scss" scoped>
.text-chart {
  width: 100%;
  height: 100%;
  position: relative;

  .text {
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: 500;
    color: #3BA6F0;
    position: absolute;
    top: calc(50% - 15px);
    left: 0;
  }
}
</style>
