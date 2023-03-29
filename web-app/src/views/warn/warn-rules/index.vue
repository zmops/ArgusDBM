<template>
  <div class="app-container">
    <ParamsSearchForm :params="params" @search="handleQuery" @rest="resetQuery" />
    <div class="table-page-main">
      <BusinessButtons :buttons="buttons" />
      <BusinessTable
        ref="multipleTable"
        :table-data="tableData"
        :columns="columns"
        :loading="loading"
        serial
        selection
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
    <dialog-form ref="dialogForm" :title="$t('warnRules.form[\'\']')">
      <template v-slot:form>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          :show-message="false"
          label-width="150px"
          style="margin-right:80px"
        >
          <el-form-item :label="$t('warnRules.form.field')" prop="cascadeValues">
            <el-cascader
              v-model="form.cascadeValues"
              :options="hieoOptions"
              style="width:100%"
              @change="handleCasChange"
            />
          </el-form-item>
          <el-form-item label="">
            <el-collapse value="1">
              <el-collapse-item :title="$t('warnRules.form[\'field.collapse\']')" name="1">
                <div v-if="form.cascadeValues.length==3">
                  <code> {{ "${"+form.cascadeValues[2]+"}" }} : {{ $t('warnRules.form[\'field.collapse.tip1\']') }}</code>
                </div>
                <div v-for="otherMetric in otherMetrics" :key="otherMetric">
                  <code> {{ "${"+otherMetric+"}" }} : {{ $t('warnRules.form[\'field.collapse.tip2\']') }}</code>
                </div>
                <div v-if="form.cascadeValues.length!=0">
                  <code> {{ $t('warnRules.form[\'field.collapse.tip3\']') }}</code>
                </div>
                <div><code> {{ $t('warnRules.form[\'field.collapse.tip4\']') }}</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item :label="$t('warnRules.form.expr')" prop="expr">
            <el-input
              v-model="form.expr"
              type="textarea"
              :rows="3"
              :placeholder="$t('warnRules.form[\'expr.placeholder\']')"
              maxlength="100"
              show-word-limit
            />
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC" />{{ $t('warnRules.form[\'expr.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item label="告警级别" prop="priority">
            <el-select v-model="form.priority" placeholder="请选择告警级别" style="width:100%">
              <el-option label="警告告警" :value="0" />
              <el-option label="严重告警" :value="1" />
              <el-option label="紧急告警" :value="2" />
            </el-select>
            <div style="font-size: 12px;color: #757D8F">
              <i
                class="el-icon-info argus-mr-5"
                style="color: #5A98EC"
              />{{ $t('warnRules.form[\'priority.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('warnRules.form.times')" prop="times">
            <el-input-number v-model="form.times" :min="1" :max="10000" />
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC" />{{ $t('warnRules.form[\'times.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-collapse value="1" accordion>
              <el-collapse-item :title="$t('warnRules.form[\'times.collapse\']')" name="1">
                <div><code> {{ $t('warnRules.form[\'times.collapse.tip1\']') }}</code></div>
                <div><code>{{ $t('warnRules.form[\'times.collapse.tip2\']') }}</code></div>
                <div v-if="form.cascadeValues.length==3">
                  <code> {{ $t('warnRules.form[\'times.collapse.tip3') }}</code>
                </div>
                <div v-if="form.cascadeValues.length==3">
                  <code> {{ "${"+form.cascadeValues[2]+"}" }} : {{ $t('warnRules.form[\'times.collapse.tip4\']') }}</code>
                </div>
                <div v-for="otherMetric in otherMetrics" :key="otherMetric">
                  <code> {{ "${"+otherMetric+"}" }} : {{ $t('warnRules.form[\'times.collapse.tip5\']') }}</code>
                </div>
                <div><code> {{ $t('warnRules.form[\'times.collapse.tip6\']') }}</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item :label="$t('warnRules.form.template')" prop="template">
            <el-input
              v-model="form.template"
              type="textarea"
              :rows="3"
              :placeholder="$t('warnRules.form[\'template.placeholder\']')"
              show-word-limit
            />
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC" />{{ $t('warnRules.form[\'template.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('warnRules.form.preset')">
            <el-switch v-model="form.preset" />
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC" />{{ $t('warnRules.form[\'preset.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('warnRules.form.enable')">
            <el-switch v-model="form.enable" />
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC" />{{ $t('warnRules.form[\'enable.tip\']') }}
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ $t('buttons.save') }}</el-button>
            <el-button @click="onCancel">{{ $t('buttons.canel') }}</el-button>
          </el-form-item>
        </el-form>
      </template>
    </dialog-form>
    <!-- 弹出编辑页面 -->

    <transfer-monitor ref="dialogTransfer" :title="$t('warnRules.dialog[\'\']')" width="1290px" />

  </div>
</template>

<script>
import DialogForm from '@/components/DialogForm'
import TransferMonitor from './components/TransferMonitor.vue'
import ParamsSearchForm from '@/components/BusinessComponents/ParamsSearchForm'
import BusinessButtons from '@/components/BusinessComponents/BusinessButtons'
import BusinessTable from '@/components/BusinessComponents/BusinessTable'
import Pagination from '@/components/BusinessComponents/Pagination'
import {
  getHierarchy
} from '@/api/monitor/monitor-type-manage'
import {
  getDefines,
  getDefine,
  addDefine,
  modifyDefine,
  delDefine
} from '@/api/monitor/alert-define'
import {
  WARN_LEVEL
} from '@/const/const'

const defaultQueryParams = {
  ids: [],
  priority: null,
  order: 'desc',
  pageIndex: 0,
  pageSize: 15
}
const defaultForm = {
  cascadeValues: [],
  app: '',
  metric: '',
  field: '',
  preset: true,
  expr: '',
  priority: 2,
  times: 3,
  enable: true,
  template: ''
}
export default {
  name: 'WarnRules',
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
    DialogForm,
    TransferMonitor
  },
  data() {
    return {
      queryParams: Object.assign({}, defaultQueryParams),
      otherMetrics: [],
      hieoOptions: [],
      selectionIds: [],
      isedit: false,
      form: Object.assign({}, defaultForm),
      rules: {
        'cascadeValues': [{
          required: true,
          message: this.$t('warnRules.rules.cascadeValues'),
          trigger: 'change'
        }],
        'expr': [{
          required: true,
          message: this.$t('warnRules.rules.expr'),
          trigger: 'blur'
        }],
        'priority': [{
          required: true,
          message: this.$t('warnRules.rules.priority'),
          trigger: 'change'
        }],
        'times': [{
          required: true,
          message: this.$t('warnRules.rules.times'),
          trigger: 'change'
        }],
        'template': [{
          required: true,
          message: this.$t('warnRules.rules.template'),
          trigger: 'blur'
        }]
      },
      total: 0,
      params: [{
        componentName: 'SelectTemplate',
        keyName: 'priority',
        label: this.$t('alert.priority[\'\']'),
        optionId: 'key',
        optionName: 'value',
        options: WARN_LEVEL
      }],
      buttons: [{
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
      loading: false,
      columns: [{
        label: this.$t('warnRules.form.field'),
        prop: 'field'
      },
      {
        label: this.$t('warnRules.form.expr'),
        prop: 'expr'
      },
      {
        label: this.$t('warnRules.form.priority'),
        prop: 'priorityName'
      },
      {
        label: this.$t('warnRules.form.times'),
        prop: 'times'
      },
      {
        label: this.$t('warnRules.form.template'),
        prop: 'template'
      },
      {
        label: this.$t('warnRules.form.preset'),
        prop: 'preset',
        idName: 'id',
        leftText: '是',
        rightText: '否',
        component: 'StatusSwitch',
        event: 'handleChangepreset'
      },
      {
        label: this.$t('warnRules.form.enable'),
        prop: 'enable',
        idName: 'id',
        component: 'StatusSwitch',
        event: 'handleChangeenable'
      },
      {
        label: this.$t('tableView.operate'),
        prop: 'buttons',
        width: 160,
        idName: 'id',
        buttons: [{
          label: this.$t('buttons.unionMonitor'),
          event: 'connMonitors'
        }, {
          label: this.$t('tableView.edit'),
          event: 'edit'
        }]
      }
      ]
    }
  },
  created() {
    this.getData()
    getHierarchy().then(res => {
      this.hieoOptions = res.data
    })
  },
  methods: {
    getData() {
      this.loading = true
      getDefines(this.queryParams).then(res => {
        res.data.content.forEach(element => {
          // 告警级别
          WARN_LEVEL.forEach(item => {
            if (item.key == element.priority) { element.priorityName = item.value }
          })
        })
        this.tableData = res.data.content
        this.total = res.data.totalElements
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
      this.queryParams.pageIndex = 0
      this.size = 15
      this.getData()
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 数据格式化
          const data = Object.assign({}, this.form)
          if (this.form.cascadeValues.length == 3) {
            data.app = this.form.cascadeValues[0]
            data.metric = this.form.cascadeValues[1]
            data.field = this.form.cascadeValues[2]
          }
          delete data.cascadeValues
          if (!this.isedit) {
            addDefine(data).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.getData()
              this.$refs.dialogForm.handleDialogClose()
            })
          } else {
            modifyDefine(data).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.getData()
              this.$refs.dialogForm.handleDialogClose()
            })
          }
        }
      })
    },
    // 是否启用
    handleChangeenable(id, v) {
      // 根据ID获取告警规则信息
      getDefine(id).then(res => {
        this.form = res.data
        this.form.enable = v
        // 修改
        modifyDefine(this.form).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getData()
        })
      })
    },
    // 全局默认
    handleChangepreset(id, v) {
      // 根据ID获取告警规则信息
      getDefine(id).then(res => {
        this.form = res.data
        this.form.preset = v
        // 修改
        modifyDefine(this.form).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getData()
        })
      })
    },
    onCancel() {
      this.$refs.dialogForm.handleDialogClose()
    },
    /* 添加 */
    add() {
      this.isedit = false
      this.form = Object.assign({}, defaultForm)
      this.reset()
      this.$refs.dialogForm.handleDialogOpen()
    },
    /* 编辑 */
    edit(id) {
      this.isedit = true
      getDefine(id).then(res => {
        this.form = res.data
        this.form.cascadeValues = [res.data.app, res.data.metric, res.data.field]
        this.$refs.dialogForm.handleDialogOpen()
      })
    },
    connMonitors(id) {
      this.$refs.dialogTransfer.handleDialogOpen(id)
    },
    // 表单重置
    reset() {
      this.resetForm('form')
    },
    delete() {
      if (this.selectionIds.length > 0) {
        const ids = []
        this.selectionIds.forEach(item => {
          ids.push(item.id)
        })
        this.$modal.confirm(this.$t('message.deleteTips')).then(function() {
          return delDefine(ids)
        }).then(() => {
          this.getData()
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }).catch(() => {})
      } else {
        this.$message.error(this.$t('message.noselectTips'))
      }
    },
    handleSelect(selection, row) {
      this.selectionIds = selection
    },
    handleCasChange(value) {
      if (value.length == 3) {
        this.hieoOptions.forEach(hierarchy => {
          if (hierarchy.value == value[0]) {
            hierarchy.children.forEach(metrics => {
              if (metrics.value == value[1]) {
                this.otherMetrics = []
                metrics.children.forEach(item => {
                  if (item.value != value[2]) {
                    this.otherMetrics.push(item.value)
                  }
                })
              }
            })
          }
        })
      }
    }
  }
}

</script>
