<!-- 概览页柱状图 -->
<template>
  <div ref="barChart" v-loading="loading" class="barChart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarChart',
  props: {
    xData: {
      type: Array,
      default() {
        return []
      }
    },
    seriesData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      myChart: null
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.loading = true
      // 判断是否已经有图例
      if (this.myChart) {
        this.initChart()
      } else {
        const chart = echarts.init(this.$refs.barChart)
        this.myChart = chart
        this.initChart()
      }
      this.loading = false
    })
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose
    }
  },
  methods: {
    initChart() {
      const _this = this
      const yAxis = {
        type: 'value',
        axisLine: { // 轴线
          show: false
        },
        axisLabel: { // 刻度标签
          show: true,
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
      }
      const xAxis = {
        type: 'category',
        data: _this.xData,
        // type: 'category',
        boundaryGap: true,
        axisLine: { // 轴线
          show: true,
          lineStyle: {
            color: '#E5E6EB'
          }
        },
        axisLabel: { // 刻度标签
          show: true,
          color: '#86909C',
          fontSize: 12
        },
        splitLine: { // 分割线
          show: false
        },
        axisTick: { // 刻度
          show: false
        }
      }
      const option = {
        tooltip: {
          show: true
        },
        // tooltip: {
        //   trigger: 'axis',
        //   confine: true,
        //   formatter:(params) => {
        //     const arr = params[0].axisValueLabel.split('\n')
        //     let str = arr[1]+' '+arr[0]+'<br/>'
        //     params.forEach((i) => {
        //       const d = i.data[1] === null ? '--' : i.data[1].toFixed(2)
        //       const u = _this.unit?_this.unit:_this.info.unit?_this.info.unit:''
        //       str += '<div style="width: 10px;height: 10px;display:inline-block;border-radius: 50%;background-color: '+i.color+'"></div> ' + i.seriesName + ': ' + d + ' ' + u + '<br/>'
        //     })
        //     return str
        //   },
        // },
        grid: {
          top: 30,
          left: 20,
          right: 20,
          bottom: 10,
          containLabel: true
        },
        yAxis: yAxis,
        xAxis: xAxis,
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
.barChart {
  width: 100%;
  height: 100%;
}
</style>
