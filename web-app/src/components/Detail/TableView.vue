<!--详情页列表组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div ref="tableView" class="table-view">
        <el-table
          :data="tableData"
          stripe
          size="mini"
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in labelLst"
            :key="'label'+index"
            :prop="'val'+index"
            :label="item"
          />
        </el-table>
        <Pagination :size="5" :current-page="1" :total="1" />
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { getLatestValue } from '@/api/monitor/monitor-manage-batch'
import { getTargetData } from '@/utils/detail'
import GridItemStyle from '@/components/Detail/GridItemStyle'
import Pagination from '@/views/overview/Pagination'

export default {
  name: 'TableView',
  components: {
    GridItemStyle,
    Pagination
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
        return {}
      }
    }
  },
  data() {
    return {
      info: {},
      tableData: [],
      labelLst: [],
      tableHeight: 0,
      monitorId: this.$route.query.monitorId
    }
  },
  watch: {
    targetName: {
      immediate: true,
      handler(val) {
        const m = val.split('.')
        getLatestValue(this.monitorId, m[1]).then((res) => {
          if (res.code === 0 && res.data) {
            if (res.data.fields) {
              this.labelLst = res.data.fields.map((i) => {
                return i.name
              })
            }
            if (res.data.valueRows) {
              this.tableData = res.data.valueRows.map((i) => {
                const obj = {}
                if (i.values && i.values.length) {
                  i.values.forEach((ii, index) => {
                    obj['val' + index] = ii.origin
                  })
                }
                return obj
              })
            }
          }
        })
      }
    }
  },
  created() {
    this.info = getTargetData(this.targetType, this.targetName)
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tableView) {
        const height = this.$refs.tableView.clientHeight
        this.tableHeight = height - 48
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.table-view {
  width: 100%;
  height: 100%;
}
</style>
