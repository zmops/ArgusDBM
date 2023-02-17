<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div class="setting-form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="line-button-wrapper">
          <button class="search-btn" @click.prevent="onSearch">{{ $t('buttons.search') }}</button>
          <button class="reset-btn" @click.prevent="onReset">{{ $t('buttons.reset') }}</button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table栏位 -->
    <div class="table-content">
      <el-table :data="tableData" :row-class-name="tableRowClassName" border v-loading="loading" ref="settingTable"
        style="width: 100%;" @select="handleSelect" @select-all="handleSelectAll" :header-cell-style="getRowClass"
        @sort-change="sortChange" row-key="id" lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <div slot="empty">
          <div class="noData">
            <svg-icon iconClass="no_data" style="font-size:100px;"></svg-icon>
            <span>{{ $t('table.empty') }}</span>
          </div>
        </div>
        <el-table-column v-if="selection" header-align="center" align="center" type="selection" width="50"
          :selectable="selectable"></el-table-column>
        <el-table-column v-if="Roo" header-align="center" align="center" type="index" width="50" label="序号">
        </el-table-column>
        <!-- 需要配置右对齐的列添加column_align：right -->
        <el-table-column :header-align="item.column_align ? item.column_align : 'left'"
          :align="item.column_align ? item.column_align : 'left'" v-for="(item, index) in tableColumns" :key="index"
          :label="item.label" :width="item.width" :min-width="item.minWidth" :sortable="item.sort || false"
          :sort-method="sortMethod" :fixed="item.fixed">
          <template slot-scope="scope">
            <template v-if="item.prop === 'buttons'">
              <operation-buttons :dataId="
                                  scope.row.id ||
                                      scope.row.moId ||
                                      scope.row.businessid ||
                                      scope.row.userId ||
                                      scope.row.roleId
                              " :problemId="scope.row.problemId" :index="scope.$index" :buttons="item.buttons" />
            </template>
            <template v-else-if="item.prop==='configFile'">
              <el-tooltip class="item" effect="dark" placement="top" :disabled="scope.row['configFile'].length<=15"
                :content="scope.row['configFile']">
                <div>
                  <span slot="reference">{{scope.row['configFile'] | words}}</span>
                </div>
              </el-tooltip>
            </template>
            <template v-else-if="item.component">
              <component :is="item.component" v-bind="{
                                  ...scope.row,
                                  id:
                                      scope.row.id ||
                                      scope.row.moId ||
                                      scope.row.businessid ||
                                      scope.row.userId ||
                                      scope.row.roleId,
                                  propName: item.prop,
                                  eventName: item.event,
                                  len:item.len,
                              }" />
            </template>
            <template v-else-if="item.renderOption">
              <span v-for="(c, index) in item.renderOption(scope.row)"
                :key="index">{{ index == 0 ? c : ',' + c }}</span>
            </template>
            <template v-else-if="item.timeFormat">
              <span :class="item.className || ''" :title="
                                Number(item.timeFormat)
                                      ? transTime(Number(scope.row[item.prop]))
                                      : scope.row[item.prop]
                                      ? scope.row[item.prop]
                                      : '-'
                              ">
                {{
                Number(item.timeFormat)
                ? transTime(Number(scope.row[item.prop]))
                : scope.row[item.prop]
                ? scope.row[item.prop]
                : '-'
                }}
              </span>
              <span v-if="item.unit">{{ item.unit }}</span>
            </template>
            <!-- 内存/容量单位转换 -->
            <template v-else-if="item.convert">
              <span v-if="item.prop == 'usageMem'" style="color: #47b59f">
                {{
                scope.row['usedMem'] || scope.row['totalMem']
                ? (
                (scope.row['usedMem'] /
                scope.row['totalMem']) *
                100
                ).toFixed(2) + '%'
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'unusedMem'" style="color: #47b59f">
                {{
                scope.row['usedMem'] || scope.row['totalMem']
                ? convertSize(
                scope.row['totalMem'] -
                scope.row['usedMem']
                )
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'memMB'" style="color: #47b59f">
                {{
                scope.row['memMB']
                ? convertSize(
                scope.row['memMB'] * 1024 * 1024
                )
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'totalStorage'">
                {{
                scope.row['totalStorage']
                ? convertSize(scope.row['totalStorage'])
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'freeStorage'">
                {{
                scope.row['freeStorage']
                ? convertSize(scope.row['freeStorage'])
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'usedStoragePer'">
                {{
                scope.row['totalStorage']
                ? (
                (1 -
                scope.row['freeStorage'] /
                scope.row['totalStorage']) *
                100
                ).toFixed(2) + '%'
                : '-'
                }}
              </span>
              <span v-else-if="item.prop == 'totalMem'" style="color: #47b59f">
                {{
                scope.row[item.prop]
                ? convertSize(scope.row[item.prop])
                : '-'
                }}
              </span>
              <span v-else>
                {{
                scope.row[item.prop]
                ? convertSize(scope.row[item.prop])
                : '-'
                }}
              </span>
            </template>
            <!-- 网卡的全双工和运行状态 -->
            <template v-else-if="item.netCards">
              <span v-if="item.prop == 'duplex'">{{ scope.row[item.prop] ? '是' : '否' }}</span>
              <span v-if="item.prop == 'connected'">{{ scope.row[item.prop] ? '正常' : '未知' }}</span>
            </template>
            <template v-else>
              <span :class="item.className || ''" :title="
                                  item.conversion
                                      ? conversionTime(scope.row[item.prop])
                                      : scope.row[item.prop]
                                      ? scope.row[item.prop]
                                      : '-'
                              ">
                {{
                item.conversion
                ? conversionTime(scope.row[item.prop])
                : scope.row[item.prop]
                ? scope.row[item.prop]
                : '-'
                }}
              </span>
              <span v-if="item.unit">{{ item.unit }}</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
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
              <el-option label="警告告警" :value="0"></el-option>
              <el-option label="严重告警" :value="1"></el-option>
              <el-option label="紧急告警" :value="2"></el-option>
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
  import {
    getReceivers,addReceiver
  } from '@/api/monitor/notification-config'
  import {getTags} from '@/api/monitor/tag-manage'
  const tagsQuery = {
    search: '',
    type: 0,
    pageIndex:0,
    pageSize:1000,
  };
  export default {
    name: 'MysqlMonitor',
    components: {
      DialogForm
    },
    data() {
      return {
        receiverOptions: [],
        tagsOptions: [],
        typeOptions: [],
        itemDisable: true,
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
        }
      }
    },
    created() {
      this.initOptionData()
    },
    methods: {
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
      onSearch() {
        this.$refs.dialogForm.handleDialogOpen()
      },
      onSubmit(){
        this.$refs["form"].validate(valid => {
          if (valid) {
            addReceiver(this.form).then(res => {
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
