<template>
  <div class="tabpane-container">
    <div class="tool-box">
      <div class="notice-action">
        <el-checkbox v-model="checked" @change="checkedAll(allList)">全选</el-checkbox>
        <div class="button-group">
          <el-button size="mini" type="primary" @click="enterAll">批量确认</el-button>
          <el-button size="mini" type="primary" plain @click="ignoreAll">批量忽略</el-button>
        </div>
      </div>
      <div class="notice-content">
        <el-badge :value="total" :max="99" :hidden="total ? false : true">
          <span :class="form.acknowledged === '' ? 'active' : ''" @click="search('')">全部告警</span>
        </el-badge>
        <el-divider direction="vertical" />
        <span :class="form.acknowledged === 0 ? 'active' : ''" @click="search(0)">待确认</span>
        <el-divider direction="vertical" />

        <span :class="form.acknowledged === 1 ? 'active' : ''" @click="search(1)">已确认</span>
      </div>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="allList"
        tooltip-effect="dark"
        style="width: 100%"
        :show-header="false"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column width="70" class="status-wrapper">
          <template slot-scope="scope">
            <i
              :class="{
                emergency: scope.row.severity === 5,
                senior: scope.row.severity === 4,
                intermediate: scope.row.severity === 3,
                general: scope.row.severity === 2,
                info: scope.row.severity === 1,
              }"
            >
              <svg-icon icon-class="warring" />
            </i>
            <span
              :class="{
                emergency: scope.row.severity === 5,
                senior: scope.row.severity === 4,
                intermediate: scope.row.severity === 3,
                general: scope.row.severity === 2,
                info: scope.row.severity === 1,
              }"
              class="status-title"
            >{{ statusTitles[scope.row.severity - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="alarm-content">
              <el-row>
                <el-col :span="24" class="alarm-title">
                  <svg-icon
                    :icon-class="
                      'ml-' + scope.row.manageLevel
                    "
                  />
                  <span>{{ scope.row.moName }}</span>
                  <span class="ml-10">{{ scope.row.moTypeName }}</span>
                  <svg-icon
                    :icon-class="
                      scope.row.email
                        ? 'email'
                        : 'email-disable'
                    "
                  />
                  <svg-icon
                    :icon-class="
                      scope.row.message
                        ? 'message'
                        : 'message-disable'
                    "
                  />
                  <svg-icon
                    :icon-class="
                      scope.row.webchat
                        ? 'webchat'
                        : 'webchat-disable'
                    "
                  />
                  <svg-icon
                    :icon-class="
                      scope.row.dingding
                        ? 'dingding'
                        : 'dingding-disable'
                    "
                  />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="log-list">
                  <div class="log-item">
                    <span>{{ scope.row.createDate }}</span>
                    <span>
                      {{
                        scope.row.alarmRule
                          ? scope.row.alarmRule
                            .description
                          : ''
                      }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="158">
          <template slot-scope="scope">
            <div class="alarm-button-wrapper">
              <div class="button-top">
                <span class="cursor-nav" @click="toManualAlarm(scope.row.moName)">查看经验</span>
                <span>{{ scope.$index + 1 }}/{{ allList.length }}</span>
              </div>
              <div class="button-bottom">
                <el-button
                  v-if="scope.row.acknowledged === 0"
                  size="mini"
                  type="primary"
                  @click="submit(scope.row.id)"
                >确认</el-button>
                <el-button
                  v-if="scope.row.alarmRule.manual_close"
                  size="mini"
                  type="primary"
                  plain
                  @click="ignore(scope.row.id)"
                >忽略</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { acknowledgeAlarm, fetchNewAlarmList, ignoreAlarm, batchIgnore } from '@/api/alarm'
import { getIds } from '@/utils'
import EventBus from '@/utils/event-bus'

export default {
  inject: ['app'],
  data() {
    return {
      loading: false,
      statusTitles: ['紧急', '高级', '中级', '低级', '提示'].reverse(),
      form: {
        page: 1,
        size: 7,
        acknowledged: ''
      },
      allList: [],
      total: 0,
      ids: [],
      checked: false
    }
  },
  async mounted() {
    this.checked = false
    this.form.acknowledged = ''
    this.getList()
  },
  methods: {
    transTime(time, fmt = 'yyyy-MM-dd HH:mm:ss') {
      if (time) {
        const date = new Date(time)
        const full = (x) => (x < 10 ? '0' + x : x)
        return fmt
          .replace(/yyyy/, date.getFullYear())
          .replace(/MM/, full(date.getMonth() + 1))
          .replace(/dd/, full(date.getDate()))
          .replace(/HH/, full(date.getHours()))
          .replace(/mm/, full(date.getMinutes()))
          .replace(/ss/, full(date.getSeconds()))
      }
      return '-'
    },
    async searchList() {
      this.getList()
    },
    async search(id) {
      this.form.acknowledged = id
      this.getList()
    },
    async enter(id) {
      await acknowledgeAlarm({ eventids: [id] })
      this.getList()
    },
    async ignore(id) {
      await ignoreAlarm({ eventid: id })
      this.getList()
    },
    submit(id) {
      this.$confirm('是否确认该条告警?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.enter(id)
          this.$emit('exists')
        })
        .catch(() => {})
    },
    enterAll() {
      if (this.ids.length) {
        this.$confirm('是否批量确认告警?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.loading = true

            acknowledgeAlarm({ eventids: this.ids }).then((res) => {
              if (res) {
                this.getList()
                this.checked = false
              }
            })
            this.$emit('exists')
            this.loading = false
          })
          .catch(() => {})
      } else {
        this.$message.error('请选择批量操作的告警条目')
      }
    },
    ignoreAll() {
      if (this.ids.length) {
        this.$confirm('是否批量忽略告警?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.loading = true
            batchIgnore({ eventids: this.ids }).then((res) => {
              if (res) {
                this.getList()
                this.checked = false
                this.loading = false
              }
            })
            this.$emit('exists')
          })
          .catch(() => {})
      } else {
        this.$message.error('请选择批量操作的告警条目')
      }
    },
    async getList() {
      this.loading = true

      const { data } = await fetchNewAlarmList(this.form)
      this.allList = data.list
      EventBus.$emit('latestWarningExists', 'app')
      setTimeout(() => {
        this.ALARM = this.app.latestWarningExists.ALARM
      }, 600)
      this.loading = false
    },
    handleSelect(selection) {
      this.ids = selection.length > 0 ? getIds(selection) : []
    },
    checkedAll(rows) {
      const checked = !!this.checked
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, checked)
        })
        this.ids = checked ? rows.map((row) => row.id) : []
      } else {
        this.$refs.multipleTable.clearSelection()
        this.ids = []
      }
    },
    handleSelectAll(selection) {
      this.ids = selection.length > 0 ? getIds(selection) : []
    },
    toManualAlarm(moName) {
      if (this.$route.path != '/alarm/manual') {
        this.$router.replace({
          path: '/alarm/manual',
          query: {
            moName: moName
          }
        })
      } else {
        location.href = location.origin + '/alarm/manual?moName=' + moName
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.tabpane-container {
  width: 100%;
  overflow: hidden;
  height: 670px;

  .tool-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 44px;
    padding: 0 17px 0 12px;
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
    .button-group {
      margin-left: 30px;
    }
  }

  /deep/ .el-table {
    overflow: auto;

    td {
      padding: 0;
      line-height: 1;
      vertical-align: top;
      padding-top: 10px;
    }

    &:before {
      content: unset;
    }

    .el-table__row:last-child td {
      border-bottom: none;
    }
  }

  .table-container {
    width: 100%;
    overflow: auto;
    height: 100%;

    .emergency {
      color: $emergencyBorder;
    }

    .info {
      color: $promptBorder;
      vertical-align: middle;
    }

    .senior {
      color: $seniorBorder;
      vertical-align: middle;
    }

    .intermediate {
      color: $intermediateBorder;
      vertical-align: middle;
    }

    .general {
      color: $generalBorder;
      vertical-align: middle;
    }

    .status-title {
      font-size: 14px;
      font-weight: bold;
      padding-left: 5px;
      vertical-align: middle;
      &.apm-title {
        font-size: 12px;
      }
    }

    .alarm-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .alarm-title {
        font-size: 14px;
        font-weight: 500;
        color: #424242;
      }

      .svg-icon {
        font-size: 16px;
        vertical-align: middle;
      }

      .log-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;

        .log-item {
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          color: #676a6c;
          margin-top: 10px;

          span {
            white-space: unset;
          }
        }
      }
    }
  }
}

.notice-content {
  line-height: 44px;
  font-size: 12px;

  .active {
    color: #4e8ad8;
  }
}

.notice-action {
  display: flex;
}

.notice-content /deep/ .el-badge {
  line-height: 16px;
}

.notice-content /deep/ .el-badge__content.is-fixed {
  transform: translateY(-50%) translateX(100%) scale(0.8);
  padding: 0 4px;
  right: 8px;
}

.ml-10 {
  margin-left: 10px;
}

.button-top,
.button-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.alarm-button-wrapper {
  padding-right: 12px;
  height: 78px;
}

.cursor-nav {
  color: #4e8ad8;
  cursor: pointer;
}
.tabane-navbar {
  width: 300px;
  margin: 0 auto;
  line-height: 40px;
}
.tabane-nav {
  display: inline-block;
  width: 48%;
  text-align: center;
  line-height: 45px;
  &.active {
    background: linear-gradient(0deg, #3a7cdb, #5a9ce6);
    color: #fff;
  }
}
</style>
