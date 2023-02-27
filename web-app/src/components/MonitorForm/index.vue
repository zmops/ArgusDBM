<template>
  <dialog-form ref="dialogForm" :title="title" :width="width">
    <template v-slot:form>
      <el-form v-loading="loading" ref="monitorform" :model="formData" :rules="rules" :show-message="false"
        label-width="150px" style="margin-right:80px">
        <el-form-item :label="$t('minitorFormComponent.form.name')" prop="monitor.name">
          <el-input v-model="formData.monitor.name" :placeholder="$t('minitorFormComponent.form[\'name.placeholder\']')"></el-input>
          <div class="label-tip">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>{{$t('minitorFormComponent.form[\'name.tip\']')}}
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
        <el-form-item :label="$t('minitorFormComponent.form.intervals')">
          <el-input-number v-model="formData.monitor.intervals" :min="300" :max="60000" :step="1" style="width:100%">
          </el-input-number>
          <div class="label-tip">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>{{$t('minitorFormComponent.form[\'intervals.tip\']')}}
          </div>
        </el-form-item>
        <el-form-item :label="$t('minitorFormComponent.form.detected')">
          <el-switch v-model="formData.detected"></el-switch>
          <div class="label-tip">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>{{$t('minitorFormComponent.form[\'detected.tip\']')}}
          </div>
        </el-form-item>
        <!-- <el-form-item label="绑定标签">
        <el-select v-model="formData.monitor.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="label-tip">
          <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>您可以使用标签(Tag)进行监控资源的分类管理， 例如给资源分别绑定生产环境、测试环境的标签。
        </div>
      </el-form-item> -->
        <el-form-item :label="$t('minitorFormComponent.form.description')">
          <el-input v-model="formData.monitor.description" type="textarea" :rows="3" :placeholder="$t('minitorFormComponent.form[\'description.placeholder\']')"></el-input>
          <div class="label-tip">
            <i class="el-icon-info argus-mr-5" style="color: #5A98EC"></i>{{$t('minitorFormComponent.form[\'description.tip\']')}}
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onTestConnection">{{ $t('buttons.detected') }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ $t('buttons.save') }}</el-button>
          <el-button @click="onCancel">{{ $t('buttons.canel') }}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </dialog-form>
</template>
<script>
  import {
    getMonitor,
    detect,
    addMonitor,
    modifyMonitor
  } from '@/api/monitor/monitor-manage'
  import {
    getParams
  } from '@/api/monitor/monitor-type-manage'
  import DialogForm from '@/components/DialogForm'

  const defaultFormData = {
    monitor: {
      name: '',
      intervals: 300,
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
        isedit: false,
        formData: Object.assign({}, defaultFormData),
        rules: {
          'monitor.name': [{
            required: true,
            message: this.$t('minitorFormComponent.rules.name'),
            trigger: 'blur'
          }]
        },
        loading: false
      }
    },
    created() {},
    methods: {
      initForm(customFields, editData) {
        //初始化通用字段
        this.formData.params = []
        customFields.forEach((element, index) => {
          if (!element.hide) {
            this.formData.params.push(element)
            //是否需要验证
            if (element.required) {
              this.rules['params.' + index + '.value'] = [{
                required: true,
                message: element.name['zh-CN'] + this.$t('minitorFormComponent.common.notempty'),
                trigger: 'blur'
              }]
            }
          }
        });
        //如果是修改,赋值
        if (editData) {
          this.formData.monitor = editData.monitor
          editData.params.forEach(editItem => {
            this.formData.params.forEach((formItem) => {
              if (editItem.field == formItem.field) {
                this.$set(formItem, 'value', editItem.value)
              }
            })
          })
        }
        this.loading = false
        console.log(this.formData)
      },
      getParams(appname, editData) {
        getParams(appname).then(res => {
          //初始化表单字段
          this.initForm(res.data, editData)
        })
      },
      onSubmit() {
        let savadata = this.formatSaveData()
        this.$refs["monitorform"].validate(valid => {
          if (valid) {
            if (!this.isedit) {
              addMonitor(savadata).then(res => {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.onCancel()
                //调用父级刷新
                this.$parent.getData()
              })
            } else {
              modifyMonitor(savadata).then(res => {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.onCancel()
                //调用父级刷新
                this.$parent.getData()
              })
            }
          }
        });
      },
      // 取消按钮
      onCancel() {
        this.reset();
        this.$refs.dialogForm.handleDialogClose()
      },
      // 表单重置
      reset() {
        this.formData = Object.assign({}, defaultFormData);
        this.formData.monitor.app = this.appName
        this.resetForm("form");
      },
      handleAddDialogOpen(appname) {
        this.loading = true
        this.title = this.$t('minitorFormComponent.common.add')+' ' + appname + ' '+this.$t('minitorFormComponent.common.monitor')
        this.appName = appname
        this.getParams(appname)
        this.isedit = false
        this.reset();
        this.$refs.dialogForm.handleDialogOpen()
      },
      handleEditDialogOpen(id, appname) {
        this.loading = true
        this.title = this.$t('minitorFormComponent.common.modify')+' ' + appname + ' '+this.$t('minitorFormComponent.common.monitor')
        this.appName = appname
        this.isedit = true
        this.reset();
        getMonitor(id).then(response => {
          this.getParams(appname, response.data)
          this.$refs.dialogForm.handleDialogOpen()
        });
      },
      onTestConnection() {
        let savadata = this.formatSaveData()
        this.$refs["monitorform"].validate(valid => {
          if (valid) {
            this.loading = true
            detect(savadata).then(res => {
              this.loading = false
              this.$message({
                message: res.msg,
                type: 'success'
              });
            }).catch(() => {
              this.loading = false
            });
          }
        });
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
