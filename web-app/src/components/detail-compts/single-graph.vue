<!-- 详情页最新值+趋势图组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <div class="relative h-full w-full">
        <LineChart :target-name="targetName" />
        <div
          class="absolute left-0 top-[calc(50%-15px)] w-full of-hidden text-ellipsis text-center text-26px font-500 color-#3BA6F0"
          style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2"
        >
          {{ val }}
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { isStringNumber, isNumber } from '@estjs/tools';
import GridItemStyle from './gridItem-style.vue';
import LineChart from '@/components/detail-compts/LineChart.vue';
import { getTargetData } from '@/utils/detail';
import { formatter2Number } from '@/utils';

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
        val.value = formatter2Number(item.value ) + item.unit;
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

