<template>
  <div class="app-container">
    <ParamsSearchForm :params="params" @search="handleQuery" @rest="resetQuery" />
    <div class="table-page-main">
      <BusinessButtons :buttons="buttons" />
      <BusinessTable
        :table-data="tableData"
        :columns="columns"
        :loading="loading"
        serial
        selection
        @detail="detail"
        @select="handleSelect"
      />
      <Pagination
        :total="total"
        :current-page="queryParams.pageIndex+1"
        :page-size="queryParams.pageSize"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      />
    </div>
    <!-- 弹出编辑页面 -->
    <monitor-form ref="monitorForm" />
  </div>
</template>

<script>
import MonitorForm from '@/components/MonitorForm'
import ParamsSearchForm from '@/components/BusinessComponents/ParamsSearchForm'
import BusinessButtons from '@/components/BusinessComponents/BusinessButtons'
import BusinessTable from '@/components/BusinessComponents/BusinessTable'
import Pagination from '@/components/BusinessComponents/Pagination'
import { getMonitors, delMonitors } from '@/api/monitor/monitor-manage-batch'
import { MONITORS_STATUS } from '@/const/const'

const defaultQueryParams = {
  ids: [],
  app: 'postgresql',
  name: '',
  host: '',
  status: 9,
  sort: 'name',
  order: 'desc',
  pageIndex: 0,
  pageSize: 15
}
export default {
  name: 'Pgsql',
  provide() {
    return {
      farther: this
    }
  },
  components: {
    ParamsSearchForm,
    BusinessButtons,
    BusinessTable,
    Pagination,
    MonitorForm
  },
  data() {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      total: 0,
      tagsOptions: [],
      params: [
        {
          componentName: 'RadioList',
          keyName: 'status',
          label: '监控状态',
          arrayData: MONITORS_STATUS
        },
        {
          componentName: 'InputTemplate',
          keyName: 'name',
          label: this.$t('tableView.monitoring')
        },
        {
          componentName: 'InputTemplate',
          keyName: 'host',
          label: this.$t('tableView.ip')
        }
      ],
      buttons: [
        {
          label: this.$t('tableView.add'),
          icon: 'list_add',
          event: 'add'
        },
        {
          label: this.$t('tableView.delete'),
          icon: 'list_del',
          event: 'delete'
        }
      ],
      tableData: [],
      ids: [],
      loading: false,
      columns: [
        {
          label: this.$t('tableView.monitoring'),
          prop: 'name',
          event: 'detail'
        },
        {
          label: this.$t('tableView.ip'),
          prop: 'host'
        },
        {
          label: '监控状态',
          prop: 'status',
          component: 'StatusText'
        },
        // {
        //   label: this.$t('tableView.onlineStatus'),
        //   prop: 'status',
        //   component: 'StatusSwitch',
        //   idName: 'id',
        //   event: 'changeStatus',
        //   leftText: '是',
        //   rightText: '否'
        // },
        // {
        //   label: this.$t('tableView.version'),
        //   prop: 'e'
        // },
        // {
        //   label: this.$t('tableView.runningTime'),
        //   prop: 'f'
        // },
        // {
        //   label: this.$t('tableView.connected'),
        //   prop: 'g'
        // },
        // {
        //   label: this.$t('tableView.activity'),
        //   prop: 'h'
        // },
        // {
        //   label: 'QPS',
        //   prop: 'i'
        // },
        // {
        //   label: this.$t('tableView.inquire'),
        //   prop: 'j'
        // },
        // {
        //   label: this.$t('tableView.append'),
        //   prop: 'k'
        // },
        // {
        //   label: this.$t('tableView.update'),
        //   prop: 'l'
        // },
        // {
        //   label: this.$t('tableView.delete'),
        //   prop: 'm'
        // },
        // {
        //   label: this.$t('tableView.submit'),
        //   prop: 'n'
        // },
        // {
        //   label: this.$t('tableView.rollback'),
        //   prop: 'o'
        // },
        // {
        //   label: this.$t('tableView.read'),
        //   prop: 'p'
        // },
        // {
        //   label: this.$t('tableView.write'),
        //   prop: 'q'
        // },
        {
          label: this.$t('tableView.operate'),
          prop: 'buttons',
          width: 120,
          idName: 'id',
          buttons: [
            {
              label: this.$t('tableView.edit'),
              event: 'edit'
            }
          ]
        }
      ]
    }
  },
  watch: {
    'queryParams.status': {
      handler() {
        this.queryParams.page = 0
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    getData() {
      this.loading = true
      getMonitors(this.queryParams).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.content
          this.total = res.data.totalElements
        }
        this.loading = false
      })
    },
    handleSizeChange(size) {
      this.queryParams.pageSize = size
      this.getData()
    },
    handleCurrentChange(page) {
      this.queryParams.pageIndex = page - 1
      this.getData()
    },
    /* 搜索 */
    handleQuery() {
      this.queryParams.pageIndex = 0
      this.getData()
    },
    /* 重置 */
    resetQuery() {
      this.queryParams = Object.assign({}, defaultQueryParams)
      this.size = 15
      this.getData()
    },
    /* 添加 */
    add() {
      this.$refs.monitorForm.handleAddDialogOpen('postgresql')
    },
    /* 多选 */
    handleSelect(selection) {
      this.ids = selection.map((i) => { return i.id })
    },
    /* 删除 */
    delete() {
      if (this.ids.length === 0) {
        this.$message({
          message: '请选择需要删除的条目',
          type: 'warning'
        })
        return false
      }
      this.$confirm('是否确认删除选中的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMonitors(this.ids).then(async(res) => {
          // if (res.code == 200) {
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   })
          //   this.ids = []
          //   // 删除后重新请求数据
          //   await this.getList()
          // }
        })
      })
    },
    /* 跳转到详情 */
    detail(item) {
      this.$router.push('/monitor/postgresqlDetail?type=pgsql&monitorId=' + item.id)
    },
    /* 切换状态 */
    changeStatus(id, v) {
      console.log(id)
      console.log(v)
    },
    /* 编辑 */
    edit(id) {
      this.$refs.monitorForm.handleEditDialogOpen(id, 'postgresql')
    }
  }
}

</script>
