<!-- 通用列表组件 -->
<template>
  <el-table
    ref="businessTable"
    v-loading="loading"
    stripe
    size="mini"
    :data="tableData"
    :header-cell-class-name="'business-table-header'"
    class="BusinessTable"
    :height="h"
    :row-key="getRowKey"
    @select="handleSelect"
    @select-all="handleSelectAll"
  >
    <el-table-column
      v-if="selection"
      :reserve-selection="true"
      header-align="center"
      align="center"
      type="selection"
      width="50"
    />
    <el-table-column
      v-if="serial"
      header-align="center"
      align="left"
      type="index"
      width="50"
      :label="$t('tableView.serial')"
    />
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :header-align="item.column_align ? item.column_align : 'left'"
      :align="item.column_align ? item.column_align : 'left'"
      :label="item.label"
      :width="item.width"
      :min-width="item.minWidth"
      :sortable="item.sort || false"
      :sort-method="sortMethod"
      :fixed="item.fixed"
    >
      <template slot-scope="scope">
        <template v-if="item.prop === 'buttons'">
          <OperationButtons
            :data-id="scope.row[item.idName]"
            :status="scope.row['status']"
            :index="scope.$index"
            :buttons="item.buttons"
          />
        </template>
        <template v-else-if="item.timeFormat">
          <span :class="{weight: item.bold}">
            {{ Number( scope.row[ item.prop ]) ? transTime( Number( scope.row[ item.prop ])) : '-' }}
          </span>
        </template>
        <template v-else-if="item.prop === 'online'">
          <span v-if="scope.row[item.prop] === '1'" style="color: #31A105">
            ● {{ $t('tableView.online') }}
          </span>
          <span v-else-if="scope.row[item.prop] === '0'" style="color: #99B2C8">
            ● {{ $t('tableView.offline') }}
          </span>
          <span v-else>-</span>
        </template>
        <template v-else-if="item.component">
          <component :is="item.component" v-bind="{prop: scope.row[item.prop], dataId: scope.row[item.idName], event: item.event}" />
        </template>
        <template v-else>
          <span v-if="scope.row[item.prop]" :class="{event: item.event,weight: item.bold}" @click="detail(scope.row,item.event)">
            {{ scope.row[item.prop] }}
            <span v-if="item.unit">{{ item.unit }}</span>
          </span>
          <span v-else>-</span>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import OperationButtons from '@/components/BusinessComponents/OperationButtons'
import StatusSwitch from '@/components/BusinessComponents/StatusSwitch'
import StatusText from '@/components/BusinessComponents/StatusText'
import EventBus from '@/utils/event-bus'
export default {
  name: 'BusinessTable',
  components: {
    OperationButtons,
    StatusSwitch,
    StatusText
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    /* 是否需要选择框 */
    selection: {
      type: Boolean,
      default() {
        return false
      }
    },
    /* 是否需要序号 */
    serial: {
      type: Boolean,
      default() {
        return false
      }
    },
    /* 表格高度 */
    h: {
      type: [Number, String],
      default() {
        return '680px'
        // return 'calc(100% - 242px)'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    /* 过滤列表字段 */
    // newColumns() {
    //   return this.columns.filter(item => item.show)
    // }
  },
  created() {
    /* 取消选择 */
    EventBus.$on('clearSelection', 'app', () => {
      this.$refs.businessTable.clearSelection()
    })
  },
  methods: {
    /* 优化显示多选框 */
    getRowKey(row) { return this.selection ? row.id : row.index },
    /* 排序 */
    sortMethod(a, b) {
      this.$emit('sortMethod', a, b)
    },
    /* 点击事件*/
    detail(item, event) {
      if (event) {
        this.$emit(event, item)
      }
    },
    /* 多选*/
    handleSelect(selection) {
      this.$emit('select', selection)
    },
    /* 全选*/
    handleSelectAll(selection) {
      this.$emit('select', selection)
    },
    transTime(time, fmt = 'yyyy-MM-dd HH:mm:ss') {
      if (time) {
        const date = new Date(time * 1000)
        const full = (x) => (x < 10 ? '0' + x : x)
        return fmt
          .replace(/yyyy/, date.getFullYear())
          .replace(/MM/, full(date.getMonth() + 1))
          .replace(/dd/, full(date.getDate()))
          .replace(/HH/, full(date.getHours()))
          .replace(/mm/, full(date.getMinutes()))
          .replace(/ss/, full(date.getSeconds()))
      }
      return '-'
    },
    /* 清空多选 */
    clearSelection() {
      this.$refs.businessTable.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
.BusinessTable {
  //min-height: 550px;
  //height: 100%;
  width: 100%;
  padding: 0 12px 12px 12px;

  .event {
    color: #409eff;
    cursor: pointer;
    //text-decoration: underline;
  }
  .weight{
    font-weight: bold;
  }

  .disable{
    color: #f5a623;
  }

  .enable{
    color: #55BC8A;
  }
}
::v-deep.el-table{
  font-size: 12px;
  color: #242e42;
}
::v-deep.el-table th.is-leaf, .el-table td{
  border-bottom: 1px solid #eff4f9;
}
::v-deep.el-table thead{
  color: #79879c;
}

</style>
