<template>
  <div>
    <dialog-form ref="dialogForm" :title="title" :width="width">
      <template v-slot:form>
        <el-row :gutter="20">
          <el-col :span="11">
            <div class="title">关联监控待选区</div>
            <!-- <div class="setting-form">
              <el-form :inline="true" :model="queryParams" class="demo-form-inline">
                <el-form-item label="">
                  <el-input v-model="queryParams.name" clearable size="mini" placeholder="请输入监控名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryParams.host" clearable size="mini" placeholder="请输入监控Host"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="">
                  <el-select v-model="queryParams.tags" filterable size="mini" placeholder="请选择标签过滤">
                    <el-option v-for="item in tagsOptions" :key="item.id" :label="item.name+':'+item.value"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item>
                  <el-button size="mini" class="search-btn" icon="el-icon-search" @click.prevent="handlelQuery">
                  </el-button>
                </el-form-item>
              </el-form>
            </div> -->
            <el-table ref="transferLeftTable" size="mini" stripe border height="400px" :data="lTableData"
              @selection-change="handlelSelectionChange" :header-cell-style="{ background: '#E5E6EB' }"
              :header-cell-class-name="'business-table-header'" class="BusinessTable">
              <el-table-column type="selection" width="39">
              </el-table-column>
              <el-table-column prop="name" label="监控名称" width="120">
              </el-table-column>
              <el-table-column prop="host" label="监控Host" width="120">
              </el-table-column>
              <el-table-column label="标签" width="190">
                <template slot-scope="scope">
                  <div v-for="item in scope.row.tags" :key="item.value"><code>{{ item.name+':'+item.value }}</code>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <template v-for="item in monitorStatus">
                    <span v-if="item.key==scope.row.status" :key="item.key">{{ item.value }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="2">
            <div class="middlebtn">
              <div style="height:50px;">
                <el-button :disabled="lselectDisable" type="primary" icon="el-icon-arrow-right" @click="addItem">
                </el-button>
              </div>
              <div style="height:50px;">
                <el-button :disabled="rselectDisable" type="primary" icon="el-icon-arrow-left" @click="removeItem">
                </el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="title">关联监控已选区</div>
            <!-- <div class="setting-form">
              <el-form :inline="true" :model="queryParams" class="demo-form-inline"
                @selection-change="handlerSelectionChange">
                <el-form-item label="">
                  <el-input v-model="queryrParams.name" clearable size="mini" placeholder="请输入监控名称"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="queryrParams.host" clearable size="mini" placeholder="请输入监控Host"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="">
                  <el-select v-model="queryParams.tags" filterable size="mini" placeholder="请选择标签过滤">
                    <el-option v-for="item in tagsOptions" :key="item.id" :label="item.name+':'+item.value"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item>
                  <el-button size="mini" class="search-btn" icon="el-icon-search" @click.prevent="handlerQuery">
                  </el-button>
                </el-form-item>
              </el-form>
            </div> -->
            <el-table ref="transferLeftTable" size="mini" stripe border height="400px" :data="rTableData"
              :header-cell-style="{ background: '#E5E6EB' }" :header-cell-class-name="'business-table-header'"
              class="BusinessTable" @selection-change="handlerSelectionChange">
              <el-table-column type="selection" width="39">
              </el-table-column>
              <el-table-column prop="name" label="监控名称" width="120">
              </el-table-column>
              <el-table-column prop="host" label="监控Host" width="120">
              </el-table-column>
              <el-table-column prop="address" label="标签" width="190">
                <template slot-scope="scope">
                  <div v-for="item in scope.row.tags" :key="item.value"><code>{{ item.name+':'+item.value }}</code>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <template v-for="item in monitorStatus">
                    <span v-if="item.key==scope.row.status" :key="item.key">{{ item.value }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="bottom-btn">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </template>
    </dialog-form>
  </div>
</template>
<script>
  import {
    getMonitors
  } from '@/api/monitor/monitor-manage-batch'
  import {
    getAlertDefineMonitors,
    appliesMonitors
  } from '@/api/monitor/alert-define'
  import DialogForm from '@/components/DialogForm'
  import {
    getTags
  } from '@/api/monitor/tag-manage'
  import {
    MONITORS_STATUS
  } from '@/const/const'

  const defaultQueryParams = {
    ids: [],
    app: '',
    name: '',
    host: '',
    status: 9,
    sort: 'name',
    order: 'desc',
    pageIndex: 0,
    pageSize: 1000
  }

  const tagsQuery = {
    search: '',
    type: 0,
    pageIndex: 0,
    pageSize: 1000,
  };
  export default {
    name: 'MonitorForm',
    components: {
      DialogForm
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '610px'
      },
    },
    data() {
      return {
        monitorStatus: MONITORS_STATUS,
        queryParams: Object.assign({}, defaultQueryParams),
        queryrParams: {
          name: '',
          host: ''
        },
        defineId: null,
        tagsOptions: [],
        lTableData: [],
        lmultipleSelection: [],
        rmultipleSelection: [],
        rTableData: [],
        ltotal: 0,
        rtotal: 0,
        unloading: false,
        loading: false,
        lselectDisable: true,
        rselectDisable: true,
      }
    },
    created() {
      this.getTags()
    },
    methods: {
      getData() {
        this.rTableData = []
        this.lTableData = []
        getMonitors(this.queryParams).then(monitors => {
          if (monitors.code === 0) {
            //获取已关联监控
            getAlertDefineMonitors(this.defineId).then(defineMonitors => {
              monitors.data.content.forEach(monitor => {
                let b = true
                defineMonitors.data.forEach(item => {
                  if (monitor.id == item.monitor.id) {
                    this.rTableData.push(item.monitor)
                    b = false
                  }
                })
                if (b) {
                  this.lTableData.push(monitor)
                }
              })
            })
          }
        })
      },
      getTags() {
        getTags(tagsQuery).then(res => {
          this.tagsOptions = res.data.content
        })
      },
      addItem() {
        this.lmultipleSelection.forEach((item) => {
          this.rTableData.push(item)
          //删除左边项
          this.lTableData.forEach((data, index) => {
            if (item.id == data.id)
              this.lTableData.splice(index, 1)
          })
        })
      },
      removeItem() {
        this.rmultipleSelection.forEach((item) => {
          this.lTableData.push(item)
          //删除左边项
          this.rTableData.forEach((data, index) => {
            if (item.id == data.id)
              this.rTableData.splice(index, 1)
          })
        })
      },
      handlelSelectionChange(val) {
        if (val.length > 0)
          this.lselectDisable = false
        else
          this.lselectDisable = true
        this.lmultipleSelection = val
      },
      handlerSelectionChange(val) {
        if (val.length > 0)
          this.rselectDisable = false
        else
          this.rselectDisable = true
        this.rmultipleSelection = val
      },
      //搜索未关联区
      handlelQuery() {
        this.lTableData = this.filter({name:this.queryParams.name,host:this.queryParams.host},this.lTableData)
        // if(queryParams.name!=''&&queryParams.host==''){

        // }
        // else if(queryParams.name!=''&&queryParams.host!=''){}
        // else if(queryParams.name==''&&queryParams.host!=''){}
      },
      //搜索已关联区
      handlerQuery() {

      },
      onSubmit() {
        //保存数据
        let data = []
        this.rTableData.forEach(item => {
          data.push({
            alertDefineId: this.defineId,
            monitorId: item.id
          })
        })
        appliesMonitors(this.defineId, data).then(res => {
          this.$modal.msgSuccess(res.msg);
          this.$refs.dialogForm.handleDialogClose()
        })
      },
      handleDialogOpen(defineId) {
        this.defineId = defineId
        this.getData()
        this.$refs.dialogForm.handleDialogOpen()
      },
      // 取消按钮
      onCancel() {
        this.$refs.dialogForm.handleDialogClose()
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';

  .title {
    text-align: center;
    width: 100%;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 800;
    color: #1D2129;
    margin-bottom: 10px;
  }

  .setting-form {
    @include flexContainerRow;
    width: 100%;
    font-size: 12px;
    background-color: #ffffff;
  }

  .el-form-item {
    margin-bottom: 10px !important;
  }

  .el-form--inline .el-form-item {
    margin-right: 10px !important;
  }

  .el-form-item__content {
    line-height: none;
  }

  .el-input--mini,
  .el-select--mini {
    width: 155px;
  }

  .search-btn {
    background: #0077FF;
    border: 1px solid #0077FF;
    border-radius: 2px;
    color: white;
  }

  .middlebtn {
    margin: 150px 0 0 10px;
  }

  .BusinessTable {
    //min-height: 550px;
    //height: 100%;
    width: 100%;

    .event {
      color: #409eff;
      cursor: pointer;
      //text-decoration: underline;
    }

    .weight {
      font-weight: bold;
    }

    .disable {
      color: #f5a623;
    }

    .enable {
      color: #55BC8A;
    }
  }

  .bottom-btn {
    margin-top: 15px;
    align-items: center;
    text-align: center;
  }

  ::v-deep .el-dialog__body {
    padding: 15px 20px;
  }

  ::v-deep.el-table {
    font-size: 12px;
    color: #242e42;
  }

  ::v-deep.el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #eff4f9;
  }

  ::v-deep.el-table thead {
    color: #79879c;
  }

</style>
