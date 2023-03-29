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
    <dialog-form ref="dialogForm" :title="$t('sysReceiver.form[\'\']')">
      <template v-slot:form>
        <el-form
          ref="form"
          :model="form"
          label-width="150px"
          :rules="rules"
          :show-message="false"
          style="margin-right:80px"
        >
          <el-form-item :label="$t('sysReceiver.form.name')" prop="name">
            <el-input v-model="form.name" :placeholder="$t('sysReceiver.form[\'name.placeholder\']')" />
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.type')" prop="type">
            <el-select v-model="form.type" multiple :placeholder="$t('sysReceiver.form[\'type.placeholder\']')" style="width:100%">
              <el-option label="短信" :value="0" />
              <el-option label="邮件" :value="1" />
              <el-option label="企业微信" :value="4" />
              <el-option label="钉钉" :value="5" />
              <el-option label="WebHook" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.phone')">
            <el-input v-model="form.phone" :placeholder="$t('sysReceiver.form[\'phone.placeholder\']')" />
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.email')">
            <el-input v-model="form.email" :placeholder="$t('sysReceiver.form[\'email.placeholder\']')" />
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.wechatId')">
            <el-input v-model="form.wechatId" :placeholder="$t('sysReceiver.form[\'wechatId.placeholder\']')" />
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.accessToken')">
            <el-input v-model="form.accessToken" :placeholder="$t('sysReceiver.form[\'accessToken.placeholder\']')" />
          </el-form-item>
          <el-form-item :label="$t('sysReceiver.form.hookUrl')">
            <el-input v-model="form.hookUrl" :placeholder="$t('sysReceiver.form[\'hookUrl.placeholder\']')" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ $t('buttons.save') }}</el-button>
            <el-button @click="onCancel">{{ $t('buttons.canel') }}</el-button>
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
  getReceivers,
  getReceiver,
  addReceiver,
  modifyReceiver,
  delReceivers
} from '@/api/monitor/notification-config'
import {
  NOTICE_TYPE
} from '@/const/const'

const defaultQueryParams = {
  name: '',
  order: 'desc',
  pageIndex: 0,
  pageSize: 15
}

const defaultForm = {
  name: '', // 接收人
  type: [], // 通知方式
  phone: '', // 电话
  email: '', // 邮箱
  hookUrl: '', // Webhook URL
  wechatId: '', // 企业微信号
  accessToken: '', // 钉钉号
  tgBotToken: '', // 飞书机器人
  tgUserId: '', // 飞书机器人
  slackWebHookUrl: '', // 企业微信机器人
  discordChannelId: '', // 微信公众号
  discordBotToken: '' // 微信公众号
}

export default {
  name: 'SysReceiver',
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
      selectionIds: [],
      isedit: false,
      form: Object.assign({}, defaultForm),
      rules: {
        name: [{
          required: true,
          message: this.$t('sysReceiver.rules.name'),
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: this.$t('sysReceiver.rules.type'),
          trigger: 'change'
        }]
      },
      total: 0,
      params: [{
        componentName: 'InputTemplate',
        keyName: 'name',
        label: this.$t('sysReceiver.rules.type')
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
        label: this.$t('sysReceiver.form.name'),
        prop: 'name'
      },
      {
        label: this.$t('sysReceiver.form.type'),
        prop: 'typeName'
      },
      // {
      //   label: '状态',
      //   prop: 'priority'
      // },
      {
        label: this.$t('sysReceiver.form.gmtUpdate'),
        prop: 'gmtUpdate'
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
  },
  methods: {
    getData() {
      this.loading = true
      getReceivers(this.queryParams).then(res => {
        res.data.content.forEach(element => {
          // 通知方式
          element.typeName = ''
          NOTICE_TYPE.forEach(item => {
            element.type.forEach(type => {
              if (type == item.key) { element.typeName += item.value + ',' }
            })
          })
          if (element.typeName != '') {
            // 清除最后的逗号
            element.typeName = element.typeName.substr(0, element.typeName.length - 1)
          }
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
      this.size = 15
      this.getData()
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (!this.isedit) {
          addReceiver(this.form).then(res => {
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getData()
            this.$refs.dialogForm.handleDialogClose()
          })
        } else {
          modifyReceiver(this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getData()
            this.$refs.dialogForm.handleDialogClose()
          })
        }
      })
    },
    // 取消按钮
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
      this.reset()
      getReceiver(id).then(res => {
        this.form = res.data
        this.$refs.dialogForm.handleDialogOpen()
      })
    },
    delete() {
      if (this.selectionIds.length > 0) {
        const ids = []
        this.selectionIds.forEach(item => {
          ids.push(item.id)
        })
        this.$modal.confirm(this.$t('message.clearTips')).then(function() {
          return delReceivers(ids)
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
    // 表单重置
    reset() {
      this.resetForm('form')
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';

  .page-container {
    width: 100%;
    margin-top: 30px;
    @include flexContainerRowEnd;
  }

</style>

<!-- setting-form  -->
<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';

  .setting-form {
    @include flexContainerRow;
    // margin: 10px;
    border: 1px solid #ccd2d8;
    padding: 10px 0 0 16px;
    font-size: 12px;
    background-color: #ffffff;
  }

  .el-form-item {
    margin-bottom: 10px !important;
  }

  .el-form-item__content {
    line-height: none;
  }

  .search-btn {
    cursor: pointer;
    margin-top: 3px;
    width: 60px;
    height: 30px;
    background: #0077FF;
    border: 1px solid #0077FF;
    border-radius: 2px;
    color: white;

    &:focus,
    &:hover {
      outline: 0;
      background: #0077FF;
      border-color: #0077FF;
      color: #fff;
    }
  }

  .reset-btn {
    cursor: pointer;
    width: 60px;
    height: 30px;
    background: #7B8A9F;
    border: 1px solid #7B8A9F;
    border-radius: 2px;
    color: #fff;
    margin-left: 4px;

    &:focus,
    &:hover {
      outline: 0;
      background: #7B8A9F;
      border: 1px solid #7B8A9F;
      color: #fff;
    }
  }

  .line-button-wrapper ::v-deep .el-form-item__content {
    line-height: 1 !important;
  }

</style>

<!-- table  -->
<style lang="scss" scoped>
  .table-content {
    margin-top: 10px;
  }

  .simple-linear {
    background: linear-gradient(0deg, #f2f2f2, #f9f9f9);
  }

  .el-table ::v-deep .warning-row {
    background: #fcfcfc;
  }

  .el-table ::v-deep .normal-row {
    background: white;
  }

  .greenColor {
    color: #47b59f;
    text-shadow: 0px 0px 0px #47b59f;
  }

  .manageLevel {
    text-shadow: 0px 0px 0px #606266;
  }

  .urlcolor {
    color: #136284;
  }

  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    max-height: calc(100vh - 200px);
    height: 100%;
    min-height: 400px;
  }

  .noData2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    max-height: calc(100vh - 200px);
    height: 100%;
    min-height: 100px;
  }

  ::v-deep .cell-inner {
    display: inline;
  }

</style>
