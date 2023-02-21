<!--详情页趋势图组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div ref="myChart" class="line-chart" />
      <div class="legend">
        <el-table
          :data="tableData"
          stripe
          height="108"
          size="mini"
          style="width: 100%"
        >
          <el-table-column
            prop="color"
            width="30"
          >
            <template slot-scope="props">
              <div style="width: 14px;height: 6px" :style="{backgroundColor:props.row.color}" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
          />
          <el-table-column
            prop="min"
            width="80"
            align="center"
            label="min"
          />
          <el-table-column
            prop="max"
            width="80"
            align="center"
            label="max"
          />
          <el-table-column
            prop="avg"
            width="80"
            align="center"
            label="avg"
          />
        </el-table>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import * as echarts from 'echarts'
import { getTargetData } from '@/utils/detail'
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
    }
  },
  data() {
    return {
      info: {},
      myChart: null,
      loading: false,
      monitorId: this.$route.query.monitorId,
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
      seriesData: [
        {
          name: 'Email',
          type: 'line',
          showSymbol: false, // 是否显示折点
          areaStyle: {
            color: '#5B8FF9'
          },
          stack: this.s === '堆叠' ? 'Total' : '',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          showSymbol: false, // 是否显示折点
          areaStyle: {
            color: '#A6CFFF'
          },
          stack: this.s === '堆叠' ? 'Total' : '',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          showSymbol: false, // 是否显示折点
          areaStyle: {
            color: '#5AD8A6'
          },
          stack: this.s === '堆叠' ? 'Total' : '',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          showSymbol: false, // 是否显示折点
          areaStyle: {
            color: '#8FCA8D'
          },
          stack: this.s === '堆叠' ? 'Total' : '',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          showSymbol: false, // 是否显示折点
          areaStyle: {
            color: '#AEB9E5'
          },
          stack: this.s === '堆叠' ? 'Total' : '',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ],
      tableData: [
        { color: '#5B8FF9', name: '1号线', min: 0, max: 10, avg: 5 },
        { color: '#A6CFFF', name: '2号线', min: 0, max: 10, avg: 5 },
        { color: '#5AD8A6', name: '3号线', min: 0, max: 10, avg: 5 },
        { color: '#8FCA8D', name: '4号线', min: 0, max: 10, avg: 5 },
        { color: '#AEB9E5', name: '5号线', min: 0, max: 10, avg: 5 }
      ]
    }
  },
  created() {

  },
  beforeDestroy() {
    this.myChart.dispose
  },
  mounted() {
    this.$nextTick(() => {
      this.info = getTargetData(this.targetType, this.targetName)
      this.getData()
    })
  },
  methods: {
    async getData() {
      this.loading = true
      // 请求接口获取数据
      if (this.info.list && this.info.list.length) {
        for (const i of this.info.list) {
          getHistoryValue(this.monitorId, i).then((res) => {
            // if (res.code === 0) {
            //
            // }
          })
        }
      }
      // 判断是否已经有图例
      if (this.myChart) {
        this.initChart()
      } else {
        this.$nextTick(() => {
          const chart = echarts.init(this.$refs.myChart)
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
          top: 30,
          left: 20,
          right: 20,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
.line-chart {
  width: 100%;
  height: calc( 100% - 108px );
}
.legend{
  width: 100%;
  height: 108px;
  padding: 0 20px;

  ::v-deep.el-table th > .cell{
    color: #3BA6F0!important;
  }

  ::v-deep.el-table--mini td{
    padding: 0 0!important;
  }

  ::v-deep.el-table td{
    border-width: 0!important;
  }
}
</style>
