<template>
  <div class="detail">
    <div class="head">
      <div class="left">
        <svg-icon
          icon-class="monitor_back"
          style="font-size:14px;color:#3A7CDB;cursor:pointer;margin-right:14px;"
          @click="$router.back()"
        />
        <span class="left-name">{{ info.name }}</span>
        <span class="left-ip">{{ info.host }}</span>
      </div>
    </div>
    <div class="tabs-box">
      <div v-for="(item, index) in tabs" :key="'tabs'+index" class="tabs" @click="layouts = item.list;tabsId = item.title">
        <div v-if="index > 0" class="hr" />
        <div class="name" :class="tabsId === item.title ? 'active' : ''">
          {{ item.title }}
        </div>
      </div>
    </div>
    <grid-layout
      :layout.sync="layouts"
      :row-height="30"
      :col-num="24"
      :is-resizable="false"
      :is-draggable="false"
    >
      <grid-item v-for="(item) in layouts" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <component :is="item.v" v-bind="{targetType: item.t, targetName: item.k, s: item.s, w: item.w, dataObj}" />
      </grid-item>
    </grid-layout>
  </div>

</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import detailLayout from '../../../../public/csvData/detailLayout'
import { guid } from '@/utils'
import { getLatestValue } from '@/api/monitor/monitor-manage-batch'
import { getMonitor } from '@/api/monitor/monitor-manage'
export default {
  name: 'Detail',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Graph: () => import('@/components/Detail/Graph'),
    TableView: () => import('@/components/Detail/TableView'),
    Single: () => import('@/components/Detail/Single'),
    SingleGraph: () => import('@/components/Detail/SingleGraph')
  },
  data() {
    return {
      layouts: [],
      tabs: [],
      type: this.$route.query.type,
      monitorId: this.$route.query.monitorId,
      tabsId: '',
      metrics: [],
      info: {},
      dataObj: {}
    }
  },
  async created() {
    await this.getInfo()
    await this.getArr()
  },
  mounted() {
    this.$nextTick(() => {
      this.layouts = this.tabs[0].list
      this.tabsId = this.tabs[0].title
    })
  },
  methods: {
    /* 获取当前页面的信息 */
    getInfo() {
      getMonitor(this.monitorId).then((res) => {
        if (res.code === 0 && res.data.monitor) {
          this.info = res.data.monitor
        }
      })
      const data = detailLayout.split('\n')
      const arr = []
      const tabs = []
      const tabList = []
      const metrics = []
      data.forEach((i) => {
        const item = i.split(',')
        if (item[0] === this.type) {
          if (tabs.indexOf(item[1]) === -1) {
            tabs.push(item[1])
          }
          arr.push(item)
          if (item[4] === 'Single' || item[4] === 'SingleGraph') {
          // if (item[2] === '单指标') {
            const m = item[3].split('.')
            if (metrics.indexOf(m[1]) === -1) {
              metrics.push(m[1])
            }
          }
        }
      })
      this.metrics = metrics
      tabs.forEach((i) => {
        const list = []
        arr.forEach((ii) => {
          if (ii.indexOf(i) > -1) {
            list.push({
              x: Number(ii[7]), // 格栅位置
              y: Number(ii[6]), // 格栅位置
              w: Number(ii[8]), // 格栅宽度
              h: Number(ii[9]), // 格栅高度
              i: guid(), // 格栅id
              t: ii[2], // 指标类型
              k: ii[3], // 指标名称
              v: ii[4], // 格栅视图类型
              s: ii[5] // 趋势图是否堆叠
            })
          }
        })
        tabList.push({ title: i, list })
      })
      this.tabs = tabList
    },
    getArr() {
      // 获取所有的最新值
      if (this.metrics.length) {
        for (const i of this.metrics) {
          getLatestValue(this.monitorId, i).then((res) => {
            if (res.code === 0 && res.data) {
              const fields = res.data.fields
              const valueRows = res.data.valueRows[0].values
              fields.forEach((item, index) => {
                // this.dataObj[item.name] = {
                //   unit: item.unit,
                //   value: valueRows[index].origin
                // }
                this.$set(this.dataObj, item.name, { unit: item.unit, value: valueRows[index].origin })
              })
            }
          })
        }
      }
    },
    changeTabs(list) {
      // this.layouts =
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 20px 10px;
  background-color: #fff;

  .head {
    margin-bottom: 15px;
    padding: 0 10px;

    .left-name {
      color: #1D2129;
      font-size: 14px;
      font-weight: bold;
    }

    .left-ip {
      color: #0077FF;
      font-size: 14px;
      margin-left: 15px;
      font-weight: bold;
    }
  }

  .tabs-box {
    width: 100%;
    height: 62px;
    border-radius: 4px;
    background-color: #ECEFF4;
    color: #4E5969;
    font-size: 14px;
    padding: 10px;
    margin: 0 10px;
    display: flex;

    .tabs {
      display: flex;

      .hr {
        margin-top: 5px;
        width: 2px;
        height: 32px;
        background-color: #DEDFE2;
      }

      .name{
        cursor: pointer;
        height: 42px;
        line-height: 42px;
        min-width: 160px;
        text-align: center;
        border-radius: 4px;
        &:hover {
          background-color: #fff;
        }
      }

      .active {
        color: #1382FF;
        background-color: #fff;
      }
    }
  }

  .item {
    width: 100%;
    height: 100%;
    border: #000 1px solid;
    background-color: #CCCCCC;
  }
}
</style>
