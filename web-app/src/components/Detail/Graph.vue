<!--详情页趋势图组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div ref="myChart" v-loading="loading" :class="w===24?'line-chart24':'line-chart'" />
      <div v-loading="loading" :class="w===24?'legend24':'legend'">
        <div v-if="tableData.length" class="legend-title">最新值</div>
        <div v-else class="no-data"><div>暂无数据</div></div>
        <div class="legend-box">
          <div v-for="(item, index) in tableData" :key="'table'+index" class="item" :class="active === index || active === null ? 'active' : 'no-active'" @click="changeLegend(index)">
            <div class="color">
              <div :style="{backgroundColor: item.color}" />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="latest">{{ item.latest }}</div>
          </div>
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import * as echarts from 'echarts'
import { dataToChartData, getTargetData, getTargetName } from '@/utils/detail'
import GridItemStyle from '@/components/Detail/GridItemStyle'
import { getHistoryValue } from '@/api/monitor/monitor-manage-batch'
export default {
  name: 'Graph',
  components: {
    GridItemStyle
  },
  props: {
    /* 指标类型('单指标/指标组合') */
    targetType: {
      type: String,
      default: '指标组合'
    },
    /* 指标名称 */
    targetName: {
      type: String,
      default: ''
    },
    /* 控件样式 */
    s: {
      type: String,
      default: ''
    },
    /* 控件宽度 */
    w: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      info: {},
      myChart: null,
      loading: false,
      monitorId: this.$route.query.monitorId,
      active: null,
      option: {
        title: {
          text: '暂无数据',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#5e6d82',
            fontWeight: 'normal',
            fontSize: 14
          }
        }
      },
      seriesData: [],
      selected: {},
      color: ['#5A90F9', '#A7CFFF', '#58D9A6', '#8EC98D', '#AEB9E5', '#5E7091', '#F7BE12', '#DBDC8C', '#E86453', '#EEA19E', '#6DC7EB', '#A3DAE5', '#945FB8', '#CFA8E1', '#FE9745', '#FFD298', '#1E9593', '#77B7DF', '#FF98BF', '#D198C0'],
      color2: ['#F6BD16', '#DCDC8C', '#FF9845', '#FFD298', '#E86452', '#EEA29D', '#FF99C3', '#D198BF', '#D1A8DF', '#945FB9', '#5D7092', '#5B8FF9', '#AEB9E5', '#A6CFFF', '#6DC8EC', '#A3D9E5', '#78B6E0', '#5AD8A6', '#8FCA8D', '#1E9493'],
      color3: ['#1E9493', '#8FCA8D', '#5AD8A6', '#78B6E0', '#A3D9E5', '#A6CFFF', '#A6CFFF', '#AEB9E5', '#5B8FF9', '#5D7092', '#945FB9', '#D1A8DF', '#D198BF', '#FF99C3', '#EEA29D', '#E86452', '#FFD298', '#FF9845', '#DCDC8C', '#F6BD16'],
      color4: ['#5AD8A6', '#1E9493', '#5B8FF9', '#5D7092', '#945FB9', '#E86452', '#FF9845', '#F6BD16', '#FFD298', '#DCDC8C', '#8FCA8D', '#A3D9E5', '#6DC8EC', '#78B6E0', '#A6CFFF', '#AEB9E5', '#EEA29D', '#D198BF', '#D1A8DF', '#FF99C3']
    }
  },
  computed: {
    tableData() {
      const arr = this.seriesData.map((i, index) => {
        let latest = 0
        if (i.data.length) {
          latest = i.data[0]
        }
        return { name: i.name, color: this.color[index % 20], latest: latest[1] }
      })
      return arr
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose
    }
  },
  async mounted() {
    this.info = getTargetData(this.targetType, this.targetName)
    await this.getData()
    const chart = echarts.init(this.$refs.myChart)
    this.myChart = chart
    await this.initChart()
  },
  methods: {
    /* 变更图例 */
    changeLegend(index) {
      if (index === this.active) {
        this.active = null
      } else {
        this.active = index
      }
      const selected = {}
      this.seriesData.forEach((i, ind) => {
        let b = true
        if (this.active === null) {
          b = true
        } else {
          b = ind === this.active
        }
        selected[i.name] = b
      })
      this.selected = selected
      this.initChart()
    },
    async getData() {
      this.loading = true
      // 请求接口获取数据
      if (this.info.list && this.info.list.length) {
        for (const i of this.info.list) {
          await getHistoryValue(this.monitorId, i).then((res) => {
            if (res.code === 0) {
              const name = getTargetName(i)
              this.seriesData = this.seriesData.concat(dataToChartData(res.data, name))
            }
          })
        }
      }
    },
    initChart() {
      const _this = this
      const option = {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        // dataZoom: [{
        //   type: 'inside'
        // }],
        legend: {
          show: false,
          selected: _this.selected
        },
        grid: {
          top: 10,
          left: 20,
          right: 20,
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLine: { // 轴线
            show: false
          },
          axisLabel: { // 刻度标签
            color: '#86909C',
            fontSize: 12
          },
          axisTick: { // 刻度
            show: false
          },
          splitLine: { // 分割线
            show: false
          }
        },
        yAxis: {
          type: 'value',
          nameGap: 10,
          axisLine: { // 轴线
            show: false
          },
          axisLabel: { // 刻度标签
            color: '#86909C',
            fontSize: 12
          },
          splitLine: { // 分割线
            show: true,
            lineStyle: {
              color: '#E5E6EB'
            }
          },
          axisTick: { // 刻度
            show: false
          }
        },
        series: _this.seriesData.map((i, index) => {
          return {
            name: i.name,
            data: i.data,
            type: 'line',
            showSymbol: false, // 是否显示折点
            color: _this.color[index % 20],
            lineStyle: {
              color: _this.color[index % 20]
            },
            areaStyle: {
              color: _this.color[index % 20],
              opacity: 0.4
            },
            stack: _this.s === '堆叠' ? 'Total' : ''
          }
        })
      }
      if (_this.seriesData.length) {
        _this.myChart.setOption(option, true)
      } else {
        _this.myChart.setOption(_this.option, true)
      }
      _this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: calc( 100% - 76px );
}

.legend{
  width: 100%;
  height: 76px;
  padding: 0 20px;

  .legend-box{
    height: 54px;
  }
}

.no-data {
  width:100%;
  height:100%;
  text-align: center;
  color: #5E6D82;
  font-size: 12px;
  display: flex;
  align-items: center;

  div {
    width: 100%;
  }
}

.line-chart24{
  display: inline-block;
  width: calc( 100% - 510px );
  height: 100%;
  vertical-align: top;
}

.legend24{
  display: inline-block;
  width: 500px;
  height: 100%;
  padding: 0 10px;

  .legend-box{
    height: calc(100% - 25px);
  }
}

.legend-title{
  width: 100%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: #3BA6F0;
  text-align: right;
  padding-right: 10px;
}

.legend-box{
  width: 100%;
  overflow-y: auto;
  font-size: 12px;

  .item{
    width: 100%;
    height: 18px;
    line-height: 18px;
    display: flex;
    cursor: pointer;

    &:hover{
      background-color: #F7F8FA;
    }

    .color{
      width: 30px;
      padding: 6px 9px;
      div{
        width: 14px;
        height: 6px;
      }
    }

    .name{
      flex-grow: 1
    }

    .latest{
      width: 150px;
      text-align: right;
      padding-right: 10px;
    }
  }

  .active{
    opacity: 1
  }

  .no-active{
    opacity: 0.5
  }
}
</style>
