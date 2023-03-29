<template>
  <div>
    <div class="notice">
      <div class="notice-ac">
        <div v-for="(item, index) in alarmNumList" :key="index" class="no-item" @click="showCurrent(item.key)">
          <el-tooltip :content="item.value" placement="bottom" :offset="-10">
            <span>
              <svg-icon :icon-class="item.icon" />
              <span class="no-num">{{ item.num > 99 ? '99+' :item.num }}</span>
            </span>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getSummary
} from '@/api/monitor/alarm-manage-batch'
import { WARN_LEVEL } from '@/const/const'

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      dot: false,
      showNotice: false,
      activeName: '0',
      classify: 0,
      msgSum: 0,
      tableData: [],
      alarmNumList: WARN_LEVEL,
      noticeList: [],
      currentCount: 0,
      noticeLoading: false,
      time: null,
      warnlevel: null
    }
  },
  created() {},
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getSummary().then(res => {
        console.log(res)
        this.alarmNumList.forEach(item => {
          if (item.key == 2)
          // 紧急告警
          { item.num = res.data.priorityEmergencyNum }
          if (item.key == 1)
          // 严重告警
          { item.num = res.data.priorityCriticalNum }
          if (item.key == 0)
          // 警告告警
          { item.num = res.data.priorityWarningNum }
        })
      })
    },
    showCurrent(id) {
      this.$router.push('/warn/warnInfo?type=' + id)
    }
  }
}

</script>

<style lang="scss" scoped>
  .notice-dialog ::v-deep .el-dialog__headerbtn {
    right: 10px;
    top: 10px;
    display: none;
  }

  .notice-dialog ::v-deep .el-dialog {
    margin: unset;
    left: unset;
    margin-left: calc(100% - 520px);
  }

  .notice-title {
    width: 100%;
    height: 36px;
    background: linear-gradient(0deg,
        rgba(255, 255, 255, 1),
        rgba(250, 250, 250, 1));
    box-shadow: 0 1px 0 0 rgba(223, 228, 228, 1), 0 0 0 0 rgba(255, 255, 255, 1);
    border-radius: 1px;
    font-size: 14px;
    color: #424242;
    text-align: center;
    line-height: 36px;
  }

  .show-more {
    width: 100%;
    color: #4e8ad8;
    font-size: 12px;
    line-height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 17px;
    cursor: pointer;
  }

  .notice-badge {
    line-height: 25px;
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .history {
    width: 25px;
    border-radius: 4px;
    text-align: center;
    background-color: #e4e9ed;
  }

  .history:hover {
    background-color: #c8d9e8;
  }

  ::v-deep .el-drawer__header {
    margin-bottom: 0 !important;

    span:focus {
      outline: 0 !important;
    }
  }

  ::v-deep .el-tabs__nav {
    margin-left: 30px;

    .el-tabs__active-bar {
      background-color: #307ed8;
    }

    .is-active {
      color: #307ed8;
    }

    .el-tabs__item:hover {
      color: #307ed8;
    }
  }

  .notice-ac {
    display: flex;
    align-items: center;
    cursor: pointer;

    .no-item {
      padding-right: 20px;
    }

    .no-num {
      padding-left: 5px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #12191f;
    }
  }

  .notice {
    display: flex;
    align-items: center;
  }

  .notice-content {
    background: #e4e5e9;
    box-shadow: 0px 0px 0px 1px #cdcfd4;
    width: 340px;

    .notice-t {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #12191f;
      line-height: 1;
      text-align: left;
      padding: 17px 33px 15px 33px;
      background: #e4e5e9;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .notice-more {
        font-weight: 500;
        cursor: pointer;
        color: #3a7cdc;
      }
    }

    .notice-list {
      overflow: auto;
      padding-bottom: 20px;
      height: calc(100vh - 100px);

      .notice-i {
        margin-left: 20px;
        width: 300px;
        margin-top: 4px;
        background: #ffffff;
        border: 1px solid #b6bec6;
        border-radius: 0px 4px 4px 0px;
        border-left: 5px solid red;
        line-height: 1;

        &.border-level1 {
          border-left-color: #2f7ed8;
        }

        &.border-level2 {
          border-left-color: #e9b104;
        }

        &.border-level3 {
          border-left-color: #e57447;
        }

        &.border-level4 {
          border-left-color: #ae4646;
        }

        &.border-level5 {
          border-left-color: #6d249f;
        }
      }

      .n-i-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        padding-bottom: 15px;

        .n-i-right {
          padding-right: 17px;
        }
      }

      .n-i-left {
        line-height: 24px;
        display: flex;
        align-items: center;
      }

      .n-i-left .svg-icon {
        margin-left: -14px;
        font-size: 24px;
      }

      .n-status {
        font-family: Source Han Sans CN;
        font-weight: bold;
        font-size: 14px;
      }

      .n-name {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #12191f;
        line-height: 18px;
        background: #f2f3f7;
        border: 1px solid #9d9fa3;
        border-radius: 2px;
        text-align: center;
        padding: 0 3px;
        width: 140px;
      }

      .n-i-2 {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 1;
        padding-left: 17px;
        padding-bottom: 9px;
      }

      .n-i-3 {
        padding-left: 17px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #131a20;
        line-height: 24px;
        padding-right: 17px;
      }

      .n-i-4 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 17px;
        padding-bottom: 13px;

        .n-i-left {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #12191f;
          line-height: 24px;
        }

        .n-i-right {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #3a7cdc;
          line-height: 24px;
        }
      }
    }

    .notice-btns {
      background: #f2f3f7;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 19px;
      position: absolute;
      width: 100%;
      bottom: 0;

      .n-i-left {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #3a7cdc;
        line-height: 24px;
      }

      .n-btn {
        background: #47b59f;
        border: 1px solid #1f9780;
        border-radius: 4px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        text-align: center;
        width: 88px;
        cursor: pointer;
      }
    }
  }

  .level1 {
    color: #2f7ed8;
  }

  .level2 {
    color: #e9b104;
  }

  .level3 {
    color: #e57447;
  }

  .level4 {
    color: #ae4646;
  }

  .level5 {
    color: #6d249f;
  }

  .click-icon {
    cursor: pointer;
  }

  .icon-mask {
    color: #fff;
    opacity: 0.3;
  }

  .ml-5 {
    margin-left: 5px;
  }

</style>
