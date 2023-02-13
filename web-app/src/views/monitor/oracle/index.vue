<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div class="setting-form">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item class="line-button-wrapper">
          <button class="search-btn" @click.prevent="search">查询</button>
          <button class="reset-btn" @click.prevent="reset">重置</button>
        </el-form-item>
      </el-form>
    </div>
    <!-- table栏位 -->
    <div class="table-content">
      <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      border
      v-loading="loading"
      ref="settingTable"
      style="width: 100%;"
      @select="handleSelect"
      @select-all="handleSelectAll"
      :header-cell-style="getRowClass"
      @sort-change="sortChange"
      row-key="id"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <div slot="empty">
        <div class="noData">
          <svg-icon iconClass="no_data" style="font-size:100px;"></svg-icon>
          <span>暂无数据！</span>
        </div>
      </div>
      <el-table-column
        v-if="selection"
        header-align="center"
        align="center"
        type="selection"
        width="50"
        :selectable="selectable"
      ></el-table-column>
      <el-table-column
        v-if="Roo"
        header-align="center"
        align="center"
        type="index"
        width="50"
        label="序号"
      ></el-table-column>
      <!-- 需要配置右对齐的列添加column_align：right -->
      <el-table-column
        :header-align="item.column_align ? item.column_align : 'left'"
        :align="item.column_align ? item.column_align : 'left'"
        v-for="(item, index) in tableColumns"
        :key="index"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :sortable="item.sort || false"
        :sort-method="sortMethod"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <template v-if="item.prop === 'buttons'">
            <operation-buttons
              :dataId="
                                scope.row.id ||
                                    scope.row.moId ||
                                    scope.row.businessid ||
                                    scope.row.userId ||
                                    scope.row.roleId
                            "
              :problemId = "scope.row.problemId"
              :index="scope.$index"
              :buttons="item.buttons"
            />
          </template>
          <template v-else-if="item.prop==='configFile'">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top"
              :disabled="scope.row['configFile'].length<=15"
              :content="scope.row['configFile']"
            >
              <div>
                <span slot="reference">{{scope.row['configFile'] | words}}</span>
              </div>
            </el-tooltip>
          </template>
          <template v-else-if="item.component">
            <component
              :is="item.component"
              v-bind="{
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
                            }"
            />
          </template>
          <template v-else-if="item.renderOption">
            <span
              v-for="(c, index) in item.renderOption(scope.row)"
              :key="index"
            >{{ index == 0 ? c : ',' + c }}</span>
          </template>
          <template v-else-if="item.timeFormat">
            <span
              :class="item.className || ''"
              :title="
                              Number(item.timeFormat)
                                    ? transTime(Number(scope.row[item.prop]))
                                    : scope.row[item.prop]
                                    ? scope.row[item.prop]
                                    : '-'
                            "
            >
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
            <span
              :class="item.className || ''"
              :title="
                                item.conversion
                                    ? conversionTime(scope.row[item.prop])
                                    : scope.row[item.prop]
                                    ? scope.row[item.prop]
                                    : '-'
                            "
            >
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
  </div>
</template>

<script>
  export default {
    name: 'MysqlMonitor',
    components: {}
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
.table-content{
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
