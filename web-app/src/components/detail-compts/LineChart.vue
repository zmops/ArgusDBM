<template>
  <Chart :options="options" />
</template>

<script lang="ts">
import * as echarts from 'echarts';
import Chart from '@/components/chart/index.vue';
import { getHistoryValue } from '@/service/api';
import { dataToChartData } from '@/utils/detail';

export default defineComponent({
  name: 'LineChart',
  components: { Chart },
  props: {
    /* 指标名称 */
    targetName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const route = useRoute();
    const monitorId = route.query.monitorId;
    const loading = ref(false);

    const seriesData = ref<any[]>([]);

    const options = ref({});

    const initChart = ()=>{

      options.value = {
        tooltip: {
          show: false
        },

        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
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
        series: seriesData.value
      };

    };

    const getData = () => {
      loading.value = true;
      getHistoryValue(monitorId, props.targetName).then((res) => {
        if (res.code === 0) {
          const series = dataToChartData(res.data, '');
          if (series.length) {
            seriesData.value = [{
              data: series[0].data,
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
            }];
          }
        }
        loading.value = false;
        initChart();
      });
    };

    watch(() => props.targetName, () => {
      getData();
    });

    onMounted(() => {
      getData();
    });

    return {
      loading,
      options,
    };
  }
});
</script>

<style lang="scss" scoped>
.LineChart {
  width: 100%;
  height: 100%;
}
</style>
