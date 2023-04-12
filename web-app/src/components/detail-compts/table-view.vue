<!-- 详情页列表组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <div class="table-view">
        <el-table
          :data="tableData"
          stripe
          size="mini"
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in labelLst"
            :key="'label' + index"
            :prop="'val' + index"
            :label="item"
          />
        </el-table>
        <a-pagination :size="5" :current-page="1" :total="1" />
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { defineComponent } from 'vue';
import GridItemStyle from './gridItem-style.vue';
import { getTargetData } from '@/utils/detail';

export default defineComponent({
  name: 'TableView',
  components: {
    GridItemStyle,

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
    const route = useRoute();
    const info = ref({});
    const tableData = ref([]);
    const labelLst = ref([]);
    const tableHeight = ref(0);
    const monitorId = route.query.monitorId;
    const val = ref('');
    onMounted(() => {
      info.value = getTargetData(targetType.value, targetName.value);
    });
    watch(dataObj, (v) => {
      const name = targetName.value.split('.');
      const item = v[name[2]];
      if (item) {
        val.value = item.value + item.unit;
      }
    }, { immediate: true, deep: true });
    return {
      info,
      tableData,
      labelLst,
      tableHeight,
      monitorId,
      val
    };
  }

});
</script>

<style lang="scss" scoped>
.table-view {
  width: 100%;
  height: 100%;
}
</style>
