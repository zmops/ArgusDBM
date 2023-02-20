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
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入规则名称"></el-input>
          </el-form-item>
          <el-form-item label="接收人" prop="receiverId">
            <el-select v-model="form.receiverId" placeholder="请选择接收人" @change="handleReceiverChange" style="width:100%">
              <el-option v-for="item in receiverOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转发所有告警">
            <el-switch v-model="form.filterAll" @change="handleSwitch"></el-switch>
          </el-form-item>
          <el-form-item label="标签过滤">
            <el-select v-model="form.tags" :disabled="itemDisable" filterable multiple allow-create default-first-option
              placeholder="请选择标签过滤" style="width:100%">
              <el-option v-for="item in tagsOptions" :key="item.id" :label="item.name+':'+item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别过滤">
            <el-select v-model="form.priorities" :disabled="itemDisable" multiple placeholder="请选择级别过滤"
              style="width:100%">
              <el-option v-for="item in warnLevel" :key="item.key" :label="item.value" :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通知方式">
            <el-select v-model="form.type" multiple placeholder="请选择通知方式" style="width:100%">
              <el-option v-for="item in typeOptions" :key="item" :value="item">
                <el-option v-if="item==0" label="短信" :value="0"></el-option>
                <el-option v-if="item==1" label="邮件" :value="1"></el-option>
                <el-option v-if="item==4" label="企业微信" :value="4"></el-option>
                <el-option v-if="item==5" label="钉钉" :value="5"></el-option>
                <el-option v-if="item==2" label="WebHook" :value="2"></el-option>
              </el-option>
            </el-select>
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
  import { WARN_LEVEL } from '@/const/const'

  import {
    getReceivers,getRules,addRule
  } from '@/api/monitor/notification-config'
  import {getTags} from '@/api/monitor/tag-manage'

  const defaultQueryParams = {
    name: '',
    order: 'desc',
    pageIndex: 0,
    pageSize: 15
  }
  const tagsQuery = {
    search: '',
    type: 0,
    pageIndex:0,
    pageSize:1000,
  };
  export default {
    name: 'NotificationRules',
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
        receiverOptions: [],
        tagsOptions: [],
        typeOptions: [],
        itemDisable: true,
        warnLevel:WARN_LEVEL,
        form: {
          name: '',
          receiverId: '',
          receiverName: '',
          enable: true,
          filterAll: true,
          priorities: [],
          tags: [],
          type: []
        },
        rules: {
          'receiverId': [{
            required: true,
            message: '请选择接收人',
            trigger: 'change'
          }],
          'name': [{
            required: true,
            message: '请输入规则名称',
            trigger: 'blur'
          }]
        },
        total: 0,
        params: [
          {
            componentName: 'InputTemplate',
            keyName: 'name',
            label: '策略名称'
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
            label: '策略名称',
            prop: 'name'
          },
          {
            label: '接收人',
            prop: 'receiverName'
          },
          {
            label: '转发所有',
            prop: 'filterAll',
            component: 'StatusSwitch'
          },
          {
            label: '是否启用',
            prop: 'enable',
            component: 'StatusSwitch'
          },
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
      this.initOptionData()
    },
    methods: {
      getData() {
        getRules(this.queryParams).then(res => {
          console.log(res)
          this.tableData = res.data.content
          this.total = res.data.totalElements
        })
      },
      initOptionData() {
        this.getReceivers()
        this.getTags()
      },
      getReceivers() {
        getReceivers().then(res => {
          this.receiverOptions = res.data
        })
      },
      getTags(){
        getTags(tagsQuery).then(res => {
          this.tagsOptions = res.data.content
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
      onSubmit(){
        this.$refs["form"].validate(valid => {
          if (valid) {
            addRule(this.form).then(res => {
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.onCancel()
            })
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
          this.$modal.confirm('是否确认删除数据项？').then(function () {
            return delDefine(ids);
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
      //根据接收人获取选择的通知方式
      handleReceiverChange(value) {
        this.receiverOptions.forEach(item => {
          if (item.id == value) {
            console.log(item)
            this.form.receiverName=item.name
            this.typeOptions = item.type
          }
        })
      },
      handleSwitch(value) {
        this.itemDisable = value == true ? true: false
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
