<template>
  <div class="app-container">
    <ParamsSearchForm :params="params" @search="handleQuery" @rest="resetQuery" />
    <div class="table-page-main">
      <BusinessButtons :buttons="buttons" />
      <BusinessTable :table-data="tableData" :columns="columns" :loading="loading" @select="handleSelect" serial
        selection />
      <Pagination :total="total" :current-page="queryParams.pageIndex+1" :page-size="queryParams.pageSize"
        @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    </div>
  </div>
</template>

<script>
  import ParamsSearchForm from '@/components/BusinessComponents/ParamsSearchForm'
  import BusinessButtons from '@/components/BusinessComponents/BusinessButtons'
  import BusinessTable from '@/components/BusinessComponents/BusinessTable'
  import Pagination from '@/components/BusinessComponents/Pagination'
  import {
    getAlerts,
    putStatus,
    delAlerts,
    clearAlerts
  } from '@/api/monitor/alarm-manage-batch'
  import {
    getTags
  } from '@/api/monitor/tag-manage'
  import {
    WARN_LEVEL,
    ALARM_HANDLES
  } from '@/const/const'

  const defaultQueryParams = {
    ids: [],
    monitorId: '',
    priority: null,
    status: null,
    content: '',
    sort: '',
    order: 'desc',
    pageIndex: 0,
    pageSize: 15
  }
  const tagsQuery = {
    search: '',
    type: 0,
    pageIndex: 0,
    pageSize: 1000,
  };
  export default {
    name: 'AlarmList',
    provide() {
      return {
        farther: this
      }
    },
    components: {
      ParamsSearchForm,
      BusinessButtons,
      BusinessTable,
      Pagination
    },
    data() {
      return {
        queryParams: Object.assign({}, defaultQueryParams),
        selectionIds: [],
        total: 0,
        params: [],
        buttons: [{
            label: this.$t('buttons.markup'),
            icon: 'list_add',
            event: 'handleYes'
          },
          {
            label: this.$t('buttons.markdown'),
            icon: 'list_del',
            event: 'handleNo'
          },
          {
            label: this.$t('buttons.delete'),
            icon: 'list_del',
            event: 'delete'
          },
          {
            label: this.$t('buttons.clear'),
            icon: 'list_del',
            event: 'clear'
          }
        ],
        tableData: [],
        loading: false,
        columns: [{
            label: this.$t('tableView.underMonitoring'),
            prop: 'monitorName',
            event: 'detail'
          }, {
            label: this.$t('tableView.alarmLevel'),
            prop: 'priorityName'
          },
          {
            label: this.$t('tableView.status'),
            prop: 'statusName'
          },
          {
            label: this.$t('tableView.alarmTime'),
            prop: 'gmtUpdate'
          },
          {
            label: this.$t('tableView.alarmContent'),
            prop: 'content'
          }
        ]
      }
    },
    created() {
      //判断参数
      if (this.$route.query.type) {
        this.queryParams.priority = this.$route.query.type
      }
      this.initParams()
      this.getData()
      this.getTags()
    },
    mounted() {},
    methods: {
      getData() {
        this.loading = true
        getAlerts(this.queryParams).then(res => {
          res.data.content.forEach(element => {
            //所属监控
            element.monitorName = element.tags.monitorName
            //告警级别
            WARN_LEVEL.forEach(item => {
              if (item.key == element.priority)
                element.priorityName = item.value
            })
            //处理状态
            ALARM_HANDLES.forEach(item => {
              if (item.key == element.status)
                element.statusName = item.value
            })
          });
          this.tableData = res.data.content
          this.total = res.data.totalElements
          this.loading = false
        })
      },
      getTags() {
        // getTags(tagsQuery).then(res => {
        //   res.data.content.forEach(element => {
        //     element.label=element.name+':'+element.value
        //   });
        //   let param={
        //     componentName: 'SelectTemplate',
        //     keyName: 'tags',
        //     label: this.$t('tableView.tag'),
        //     optionId: 'id',
        //     optionName: 'label',
        //     options: res.data.content
        //   }
        //   this.params.splice(2,0,param)
        // })
      },
      initParams() {
        let alarmHandles = Object.assign([], ALARM_HANDLES)
        alarmHandles.splice(0,0,{
          key: null,
          value: this.$t('alert.status.all')
        })
        let warnLevel = Object.assign([], WARN_LEVEL)
        warnLevel.splice(0,0,{
          key: null,
          value: this.$t('alert.priority.all')
        })
        this.params = [{
            componentName: 'RadioList',
            keyName: 'status',
            label: this.$t('alert.status[""]'),
            arrayData: alarmHandles
          },
          {
            componentName: 'RadioList',
            keyName: 'priority',
            label: this.$t('alert.priority[""]'),
            arrayData: warnLevel
          },
          {
            componentName: 'InputTemplate',
            keyName: 'content',
            label: this.$t('alert.form.content[""]')
          }
        ]
      },
      handleYes() {
        this.handleChange(3)
      },
      handleNo() {
        this.handleChange(0)
      },
      handleChange(value) {
        if (this.selectionIds.length > 0) {
          let ids = []
          this.selectionIds.forEach(item => {
            ids.push(item.id)
          })
          this.$modal.confirm(value == 0 ? this.$t('message.markupTips') : this.$t('message.markdownTips')).then(function () {
            return putStatus(value, ids);
          }).then(() => {
            //清空选择框
            // this.$refs.multipleTable.clearSelection();
            this.getData();
          }).catch(() => {});
        } else {
          this.$message.error(this.$t('message.noselectTips'));
        }
      },
      delete(id, v) {
        if (this.selectionIds.length > 0) {
          let ids = []
          this.selectionIds.forEach(item => {
            ids.push(item.id)
          })
          this.$modal.confirm(this.$t('message.deleteTips')).then(function () {
            return delAlerts(ids);
          }).then((res) => {
            //清空选择框
            this.getData();
            this.$message({
              message: 'delete success',
              type: 'success'
            });
          }).catch(() => {});
        } else {
          this.$message.error(this.$t('message.noselectTips'));
        }
      },
      clear() {
        this.$modal.confirm(this.$t('message.clearTips')).then(function () {
          return clearAlerts();
        }).then((res) => {
          //清空选择框
          this.getData();
          this.$message({
            message: 'clear success',
            type: 'success'
          });
        }).catch(() => {});
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
        this.queryParams.pageIndex = 0
        this.size = 15
        this.getData()
      },
      handleSelect(selection, row) {
        this.selectionIds = selection
      },
      /* 跳转到详情 */
      detail() {
        this.$router.push('/monitor/mysqlDetail')
      }
    }
  }

</script>
