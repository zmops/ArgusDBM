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
    <dialog-form ref="dialogForm" title="通知规则">
      <template v-slot:form>
        <el-form ref="form" :model="form" label-width="150px" :rules="rules" :show-message="false"
          style="margin-right:80px">
          <el-form-item label="接收人名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入接收人名称"></el-input>
          </el-form-item>
          <el-form-item label="通知方式" prop="type">
            <el-select v-model="form.type" multiple placeholder="请选择通知方式" style="width:100%">
              <el-option label="短信" :value="0"></el-option>
              <el-option label="邮件" :value="1"></el-option>
              <el-option label="企业微信" :value="4"></el-option>
              <el-option label="钉钉" :value="5"></el-option>
              <el-option label="WebHook" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="企业微信号">
            <el-input v-model="form.wechatId" placeholder="请输入企业微信号"></el-input>
          </el-form-item>
          <el-form-item label="钉钉号">
            <el-input v-model="form.accessToken" placeholder="请输入钉钉号"></el-input>
          </el-form-item>
          <el-form-item label="Webhook URL">
            <el-input v-model="form.hookUrl" placeholder="请输入Webhook URL"></el-input>
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

const defaultForm={
          name: '', //接收人
          type: [], //通知方式
          phone: '', //电话
          email: '', //邮箱
          hookUrl: '', //Webhook URL
          wechatId: '', //企业微信号
          accessToken: '', //钉钉号
          tgBotToken: '', //飞书机器人
          tgUserId: '', //飞书机器人
          slackWebHookUrl: '', //企业微信机器人
          discordChannelId: '', //微信公众号
          discordBotToken: '' //微信公众号
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
            message: '请输入接收人名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择通知方式',
            trigger: 'change'
          }],
        },
        total: 0,
        params: [
          {
            componentName: 'InputTemplate',
            keyName: 'name',
            label: '接收人名称',
          },
          {
            componentName: 'SelectTemplate',
            keyName: 'type',
            label: '通知方式',
            optionId: 'key',
            optionName: 'value',
            options: NOTICE_TYPE
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
            label: '接收人',
            prop: 'name'
          },
          {
            label: '通知方式',
            prop: 'expr'
          },
          // {
          //   label: '状态',
          //   prop: 'priority'
          // },
          {
            label: '更新时间',
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
        this.loading=true
        getReceivers(this.queryParams).then(res => {
          this.tableData = res.data.content
          this.total = res.data.totalElements
          this.loading=false
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
        this.$refs["form"].validate(valid => {
          if (!this.isedit) {
            addReceiver(this.form).then(res => {
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.getData()
              this.$refs.dialogForm.handleDialogClose()
            })
          } else {
            modifyReceiver(this.form).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.getData()
              this.$refs.dialogForm.handleDialogClose()
            })
          }
        });
      },
      // 取消按钮
      onCancel() {
        this.$refs.dialogForm.handleDialogClose()
      },
      /* 添加 */
      add() {
        this.isedit = false
        this.form=Object.assign({}, defaultForm)
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
          let ids = []
          this.selectionIds.forEach(item => {
            ids.push(item.id)
          })
          this.$modal.confirm('是否确认删除数据项？').then(function () {
            return delReceivers(ids);
          }).then(() => {
            this.getData();
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }).catch(() => {});
        } else {
          this.$message.error('请至少选择一行进行删除');
        }
      },
      handleSelect(selection, row) {
        this.selectionIds = selection
      },
                  // 表单重置
                  reset() {
        this.resetForm("form");
      },
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
