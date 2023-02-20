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
    <!-- 弹出编辑页面 -->
    <!-- 弹出编辑页面 -->
    <dialog-form ref="dialogForm" title="告警规则">
      <template v-slot:form>
        <el-form ref="form" :model="form" :rules="rules" :show-message="false" label-width="150px"
          style="margin-right:80px">
          <el-form-item label="指标对象" prop="cascadeValues">
            <el-cascader v-model="form.cascadeValues" :options="hieoOptions" style="width:100%"
              @change="handleCasChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="">
            <el-collapse value="1">
              <el-collapse-item title="一致性 Consistency" name="1">
                <div v-if="form.cascadeValues.length==3">
                  <code> {{"${"+form.cascadeValues[2]+"}"}} : 选中的标签对象</code>
                </div>
                <div v-for="otherMetric in otherMetrics" :key="otherMetric">
                  <code> {{"${"+otherMetric+"}"}} : 所属行其它指标对象</code>
                </div>
                <div v-if="form.cascadeValues.length!=0">
                  <code> ${instance} : 所属行实例</code>
                </div>
                <div><code> 支持操作符函数 : equals(str1,str2), ==, <, <=,>, >=, !=, ( ), +, -, &&, ||</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="阈值触发表达式" prop="expr">
            <el-input type="textarea" :rows="3" v-model="form.expr" placeholder="根据此表达式计算判断是否触发阈值.示例: responseTime>40"
              maxlength="100" show-word-limit></el-input>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>根据此表达式来计算判断是否触发阈值,表达式环境变量和操作符见上方
            </div>
          </el-form-item>
          <el-form-item label="告警级别" prop="priority">
            <el-select v-model="form.priority" placeholder="请选择告警级别" style="width:100%">
              <el-option label="警告告警" :value="0"></el-option>
              <el-option label="严重告警" :value="1"></el-option>
              <el-option label="紧急告警" :value="2"></el-option>
            </el-select>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5"
                style="color: #5A98EC"></i>触发阈值的告警级别,从低到高依次为:警告-warning，严重-critical，紧急-emergency
            </div>
          </el-form-item>
          <el-form-item label="触发次数" prop="times">
            <el-input-number v-model="form.times" :min="1" :max="10000" label="描述文字"></el-input-number>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>设置触发阈值多少次之后才会发送告警
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-collapse value="1" accordion>
              <el-collapse-item title="支持的通知模版环境变量" name="1">
                <div><code> ${app} : 监控类型名称</code></div>
                <div><code> ${metrics} : 监控指标集合名称</code></div>
                <div v-if="form.cascadeValues.length==3">
                  <code> ${metric} : 监控指标名称</code>
                </div>
                <div v-if="form.cascadeValues.length==3">
                  <code> {{"${"+form.cascadeValues[2]+"}"}} : 监控指标对象值</code>
                </div>
                <div v-for="otherMetric in otherMetrics" :key="otherMetric">
                  <code> {{"${"+otherMetric+"}"}} : 所属行其它指标对象</code>
                </div>
                <div><code> ${instance} : 所属行实例值</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="通知模版" prop="template">
            <el-input type="textarea" :rows="3" v-model="form.template"
              placeholder="请输入告警的通知模版.示例: ${app}.${metrics}.${metric}'s value is too high" maxlength="200"
              show-word-limit></el-input>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>告警触发后发送的通知信息模版,模版环境变量见上方
            </div>
          </el-form-item>
          <el-form-item label="全局默认">
            <el-switch v-model="form.preset"></el-switch>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>此告警阈值配置是否应用于全局所有此类型监控
            </div>
          </el-form-item>
          <el-form-item label="启用告警">
            <el-switch v-model="form.enable"></el-switch>
            <div style="font-size: 12px;color: #757D8F">
              <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>此告警阈值配置开启生效或关闭
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </dialog-form>
  </div>
</template>

<script>
  import DialogForm from '@/components/DialogForm'
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
    modifyDefine
  } from '@/api/monitor/alert-define'

  const defaultQueryParams = {
    ids: [],
    priority: '',
    order: 'desc',
    pageIndex: 0,
    pageSize: 15
  }

  export default {
    name: 'MysqlMonitor',
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
      DialogForm
    },
    data() {
      return {
        queryParams: Object.assign({}, defaultQueryParams),
        otherMetrics: [],
        hieoOptions: [],
        selectionIds:[],
        isedit: false,
        form: {
          cascadeValues: [],
          app: "",
          metric: "",
          field: "",
          preset: true,
          expr: "",
          priority: 2,
          times: 3,
          enable: true,
          template: ""
        },
        rules: {
          'cascadeValues': [{
            required: true,
            message: '请选择指标对象',
            trigger: 'change'
          }],
          'expr': [{
            required: true,
            message: '请输入阈值触发表达式',
            trigger: 'blur'
          }],
          'priority': [{
            required: true,
            message: '请选择告警级别',
            trigger: 'change'
          }],
          'times': [{
            required: true,
            message: '请选择触发次数',
            trigger: 'change'
          }],
          'template': [{
            required: true,
            message: '请输入通知模版',
            trigger: 'blur'
          }]
        },
        total: 0,
        params: [{
            componentName: 'RadioList',
            keyName: 'status',
            label: this.$t('tableView.status'),
            arrayData: [{
                value: null,
                label: this.$t('tableView.all')
              },
              {
                value: '0',
                label: this.$t('tableView.enable')
              },
              {
                value: '1',
                label: this.$t('tableView.disable')
              }
            ]
          },
          {
            componentName: 'RadioList',
            keyName: 'OnLineStatus',
            label: this.$t('tableView.onlineStatus'),
            arrayData: [{
                value: null,
                label: this.$t('tableView.all')
              },
              {
                value: '0',
                label: this.$t('tableView.enable')
              },
              {
                value: '1',
                label: this.$t('tableView.disable')
              }
            ]
          },
          {
            componentName: 'InputTemplate',
            keyName: 'name',
            label: this.$t('tableView.monitoring')
          },
          {
            componentName: 'InputTemplate',
            keyName: 'ip',
            label: this.$t('tableView.ip')
          },
          {
            componentName: 'SelectTemplate',
            keyName: 'tag',
            label: this.$t('tableView.tag'),
            optionId: 'code',
            optionName: 'name',
            options: this.tagsOptions
          }
        ],
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
            label: '指标对象',
            prop: 'field'
          },
          {
            label: '阈值触发表达式',
            prop: 'expr'
          },
          {
            label: '告警级别',
            prop: 'priority'
          },
          {
            label: '触发次数',
            prop: 'times'
          },
          {
            label: '通知模板',
            prop: 'template'
          },
          {
            label: '全局默认',
            prop: 'preset'
          },
          {
            label: '启用告警',
            prop: 'enable'
          },
          {
            label: this.$t('tableView.operate'),
            prop: 'buttons',
            width: 120,
            idName: 'id',
            buttons: [{
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
        getDefines(this.queryParams).then(res => {
          console.log(res)
          this.tableData = res.data.content
          this.total = res.data.totalElements
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

      },
      onSubmit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            //数据格式化
            let data = Object.assign({}, this.form)
            if (this.form.cascadeValues.length == 3) {
              data.app = this.form.cascadeValues[0]
              data.metric = this.form.cascadeValues[1]
              data.field = this.form.cascadeValues[2]
            }
            delete data.cascadeValues;
            if (!this.isedit) {
              addDefine(data).then(res => {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.getData()
                this.$refs.dialogForm.handleDialogClose()
              })
            } else {
              modifyDefine(data).then(res => {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.getData()
                this.$refs.dialogForm.handleDialogClose()
              })
            }
          }
        });
      },
      onCancel() {
        this.$refs.dialogForm.handleDialogClose()
      },
      /* 添加 */
      add() {
        this.isedit = false
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
      delete() {
        if (this.selectionIds.length > 0) {
          let ids = []
          this.selectionIds.forEach(item => {
            ids.push(item.id)
          })
          console.log(ids)
        } else {
          this.$message.error('请至少选择一行进行删除');
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
