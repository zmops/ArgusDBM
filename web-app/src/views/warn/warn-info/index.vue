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
            <span>暂无数据！</span>
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
    <dialog-form ref="dialogForm" title="告警规则">
      <template v-slot:form>
        <el-form ref="form" :model="form" label-width="150px" style="margin-right:80px">
          <el-form-item label="指标对象">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="一致性 Consistency" name="1">
                <div><code> 支持操作符函数 : equals(str1,str2), ==, <, <=,>, >=, !=, ( ), +, -, &&, ||</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="阈值触发表达式">
            <el-input type="textarea" :rows="3" v-model="form.name" placeholder="根据此表达式计算判断是否触发阈值.示例: responseTime>40"
              maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="告警级别">
            <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%">
              <el-option label="警告告警" value="shanghai"></el-option>
              <el-option label="严重告警" value="beijing"></el-option>
              <el-option label="紧急告警" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="触发次数">
            <el-col :span="11">
              <el-input-number v-model="form.name" :min="1" :max="10000" label="描述文字"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="支持的通知模版环境变量" name="1">
                <div><code> ${app} : 监控类型名称</code></div>
                <div><code> ${metrics} : 监控指标集合名称</code></div>
                <div><code> ${instance} : 所属行实例值</code></div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="通知模版">
            <el-input type="textarea" :rows="3" v-model="form.name"
              placeholder="请输入告警的通知模版.示例: ${app}.${metrics}.${metric}'s value is too high" maxlength="200"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="全局默认">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="启用告警">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </dialog-form>
  </div>
</template>

<script>
  import DialogForm from '@/components/DialogForm'
  export default {
    name: 'MysqlMonitor',
    components: {
      DialogForm
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSearch() {
        this.$refs.dialogForm.handleDialogOpen()
        console.log(this.$refs.dialogForm)
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
