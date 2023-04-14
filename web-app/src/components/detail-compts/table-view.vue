<!-- 详情页列表组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <div class="table-view">
        <a-table
          class="mb-base"
          :data="tableData"
          :columns="columns"
          :pagination="{ total: 1, pageSize: 5 }"
        />
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { defineComponent } from 'vue';
import GridItemStyle from './gridItem-style.vue';
import { getTargetData } from '@/utils/detail';
import { getLatestValue } from '@/service/api';

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
    const columns = ref([]);
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
    watch(targetName, (val) => {
      const m = val.split('.');
      getLatestValue(monitorId, m[1]).then((res) => {
        if (res.code === 0 && res.data) {
          if (res.data.fields) {
            columns.value = res.data.fields.map((i) => {
              return {
                title: i.name,
                dataIndex: i.name,
              };
            });
          }
          if (res.data.valueRows) {
            tableData.value = res.data.valueRows.map((i) => {
              const obj = {};
              i.values.forEach((ii, idx) => {
                obj[columns.value[idx]?.dataIndex] = ii.origin;
              });
              return obj;
            });
          }
        }
      });
    }, { immediate: true });
    return {
      info,
      tableData,
      labelLst,
      columns,
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
