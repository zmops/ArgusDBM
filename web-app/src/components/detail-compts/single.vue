<!-- 详情页最新值组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <div class="h-full w-full flex items-center">
        <div
          class="w-full text-(ellipsis center 26px) font-500 color-dark dark:color-white"
          style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2"
        >
          {{ val }}
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { humanize } from '@estjs/tools';
import GridItemStyle from './gridItem-style.vue';
import { formatter2Number } from '@/utils';
import { getTargetData } from '@/utils/detail';
import { secondsTransform } from '@/utils/seconds2time';

export default defineComponent({
  name: 'Single',
  components: {
    GridItemStyle
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
    const info = ref({});
    const val = ref('-');

    watch(dataObj, (v) => {
      const name = targetName.value.split('.');
      const item = v[name[1] + name[2]];
      if (item) {
        if (item.unit === 's') {
          console.log(formatter2Number(item.value ));
          console.log(' ', secondsTransform(formatter2Number(item.value )) );
          val.value = secondsTransform(formatter2Number(item.value ));
          return;
        }
        if (item.unit === 'KB') {
          val.value = humanize(formatter2Number(item.value ) * 1000);
          return;
        }
        val.value = formatter2Number(item.value ) + item.unit;
      }
    }, { immediate: true, deep: true });

    onMounted(() => {
      info.value = getTargetData(targetType.value, targetName.value);
    });

    return {
      info, val
    };
  }
});
</script>
