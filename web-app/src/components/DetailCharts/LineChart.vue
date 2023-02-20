<template>
  <div ref="lineChart" v-loading="loading" class="LineChart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      myChart: null,
      loading: false,
      seriesData: [
        {
          data: [1, 10, 8, 5, 3, 7, 1],
          type: 'line',
          markLine: { // 平均线
            silent: true, // 图形是否不响应和触发鼠标事件
            symbol: 'none', // 平均线两端样式
            label: {
              show: false
            },
            lineStyle: {
              color: '#3BA6F0'
            },
            data: [{ type: 'average', name: 'Avg' }]
          },
          showSymbol: false, // 是否显示折点
          lineStyle: { // 折线颜色
            color: '#42A9F1',
            width: 1
          },
          areaStyle: { // 填充区域颜色
            opacity: 0.3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#42A9F1'
              },
              {
                offset: 1,
                color: '#ffffff00'
              }
            ])
          }
        }
      ],
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
      }
    }
  },
  watch: {
    time: {
      deep: true,
      handler(val) {
        this.getData()
      }
    },
    latestTime: {
      handler() {
        this.getData()
      }
    },
    info: {
      immediate: true,
      deep: true,
      handler(val) {
        this.getData()
      }
    },
    newSize: {
      deep: true,
      handler(val) {
        this.myChart.resize()
      }
    }
  },
  beforeDestroy() {
    this.myChart.dispose
  },
  methods: {
    async getData() {
      this.loading = true
      // 请求接口获取数据
      // 判断是否已经有图例
      if (this.myChart) {
        this.initChart()
      } else {
        this.$nextTick(() => {
          const chart = echarts.init(this.$refs.lineChart)
          this.myChart = chart
          this.initChart()
        })
      }
      this.loading = false
    },
    initChart() {
      const _this = this
      const option = {
        tooltip: {
          show: false
        },
        // dataZoom: [{
        //   type: 'inside'
        // }],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: { // 轴线
            show: false
          },
          axisLabel: { // 刻度标签
            show: false
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
            show: false
          },
          splitLine: { // 分割线
            show: false
          },
          axisTick: { // 刻度
            show: false
          }
        },
        series: _this.seriesData
      }
      if (_this.seriesData.length) {
        _this.myChart.setOption(option, true)
      } else {
        _this.myChart.setOption(_this.option, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.LineChart {
  width: 100%;
  height: 100%;
}
</style>
