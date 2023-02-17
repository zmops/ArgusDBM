<template>
  <dialog-form ref="dialogForm" :title="title" :width="width">
    <template v-slot:form>
      <el-form ref="monitorform" :model="formData" :rules="rules" :show-message="false" label-width="150px"
        style="margin-right:80px">
        <el-form-item label="监控名称" prop="monitor.name">
          <el-input v-model="formData.monitor.name" placeholder="标识监控的名称,名称需要保证唯一性"></el-input>
          <div style="font-size: 12px;color: #757D8F">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>标识监控的名称,名称需要保证唯一性
          </div>
        </el-form-item>
        <el-divider></el-divider>
        <template v-if="formData!=null">
          <template v-for="(field, index) in formData.params">
            <el-form-item :key="'params.' +index+ '.value'" :label="field.name['zh-CN']"
              :prop="'params.' +index+ '.value'">
              <el-input v-model="field.value" :placeholder="field.placeholder"></el-input>
            </el-form-item>
          </template>
        </template>
        <el-divider></el-divider>
        <el-form-item label="采集间隔(秒)">
          <el-input-number v-model="formData.monitor.intervals" :min="300" :max="60000" :step="1" style="width:100%">
          </el-input-number>
          <div style="font-size: 12px;color: #757D8F">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>监控周期性采集数据间隔时间,单位秒
          </div>
        </el-form-item>
        <el-form-item label="测试连接">
          <el-switch v-model="formData.detected"></el-switch>
          <div style="font-size: 12px;color: #757D8F">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>新增监控前是否先探测检查监控可用性
          </div>
        </el-form-item>
        <!-- <el-form-item label="绑定标签">
        <el-select v-model="formData.monitor.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div style="font-size: 12px;color: #757D8F">
          <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>您可以使用标签(Tag)进行监控资源的分类管理， 例如给资源分别绑定生产环境、测试环境的标签。
        </div>
      </el-form-item> -->
        <el-form-item label="描述备注">
          <el-input v-model="formData.monitor.description" type="textarea" :rows="3" placeholder=""></el-input>
          <div style="font-size: 12px;color: #757D8F">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>更多标识和描述此监控的备注信息
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onTestConnection">测试</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </dialog-form>
</template>
<script>
  import {
    getParams,
    detect,
    addMonitor
  } from '@/api/monitor/monitor-manage'
  import DialogForm from '@/components/DialogForm'

  const defaultFormData = {
    monitor: {
      name: 'localhost',
      intervals: 600,
      tags: [],
      description: ''
    },
    params: [],
    detected: true,
  };
  export default {
    name: 'MonitorForm',
    components: {
      DialogForm
    },
    props: {
      width: {
        type: String,
        default: '610px'
      },
    },
    data() {
      return {
        title: '',
        appName: '',
        formData: Object.assign({}, defaultFormData),
        rules: {
          'monitor.name': [{
            required: true,
            message: '请输入监控名称',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {},
    methods: {
      initForm(customFields) {
        //初始化通用字段
        this.reset()
        this.formData.params = []
        customFields.forEach((element, index) => {
          if (!element.hide) {
            this.formData.params.push(element)
            //是否需要验证
            if (element.required) {
              this.rules['params.' + index + '.value'] = [{
                required: true,
                message: element.name['zh-CN'] + '不能为空',
                trigger: 'blur'
              }]
            }
          }
        });
      },
      getParams(appname) {
        getParams(appname).then(res => {
          //初始化表单字段
          this.initForm(res.data)
        })
      },
      onTestConnection() {
        let savadata = this.formatSaveData()
        detect(savadata).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
        })
      },
      onSubmit() {
        let savadata = this.formatSaveData()
        this.$refs["monitorform"].validate(valid => {
          if (valid) {
            addMonitor(savadata).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
            })
          }
        });
      },
      // 取消按钮
      onCancel() {
        this.dialogVisible = false
        this.reset();
      },
      // 表单重置
      reset() {
        this.formData = Object.assign({}, defaultFormData);
        this.formData.monitor.app = this.appName
        this.resetForm("form");
      },
      handleAddDialogOpen(appname) {
        this.title = '新增 ' + appname + ' 监控'
        this.appName = appname
        this.getParams(appname)
        this.$refs.dialogForm.handleDialogOpen()
      },
      handleEditDialogOpen(id, appname) {
        this.title = '修改 ' + appname + ' 监控'
        this.appName = appname
        this.$refs.dialogForm.handleDialogOpen()
      },
      handleDialogClose() {
        this.$refs.dialogForm.handleDialogClose()
      },
      formatSaveData() {
        let data = Object.assign({}, this.formData)
        data.params = []
        this.formData.params.forEach(item => {
          if (item.field == 'host') {
            this.formData.monitor.host = this.parseStrEmpty(item.value)
          }
          let param = {
            "field": item.field,
            "value": this.parseStrEmpty(item.value)
          }
          data.params.push(param)
        })
        return data;
      }
    }
  }

</script>
