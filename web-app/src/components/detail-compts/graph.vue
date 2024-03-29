<!-- 详情页趋势图组件 -->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template #content>
      <Chart :options="chartOption" :class="w === 24 ? 'line-chart24' : 'line-chart'" />
      <div :class="w === 24 ? 'legend24' : 'legend'">
        <div v-if="tableData.length" class="legend-title">最新值</div>
        <div v-else class="no-data absolute left-0 top-0 mt-40px h-full w-full column items-center">
          <img src="../../assets/images/empty.png" alt="123" srcset="" />
          <div class="mt-30px">暂无数据</div>
        </div>
        <div class="legend-box">
          <div
            v-for="(item, index) in tableData" :key="'table' + index" class="item"
            :class="active === index || active === null ? 'active' : 'no-active'" @click="changeLegend(index)"
          >
            <div class="color">
              <div :style="{ backgroundColor: item.color }" />
            </div>
            <div class="name of-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</div>
            <div class="latest">{{ item.latest[1] }}</div>
          </div>
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script lang="ts">
import GridItemStyle from './gridItem-style.vue';
import { dataToChartData, getTargetData, getTargetName } from '@/utils/detail';
import { getHistoryValue } from '@/service/api';

export default defineComponent({
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
  setup(props) {
    const { targetType, targetName } = toRefs(props);

    const route = useRoute();
    const monitorId = route.query.monitorId;

    const info = ref<any>({});
    const loading = ref(false);
    const active = ref(null);
    const selected = ref({});
    const seriesData = ref([]);
    const colorList = [
      ['#5A90F9', '#A7CFFF', '#58D9A6', '#8EC98D', '#AEB9E5', '#5E7091', '#F7BE12', '#DBDC8C', '#E86453', '#EEA19E', '#6DC7EB', '#A3DAE5', '#945FB8', '#CFA8E1', '#FE9745', '#FFD298', '#1E9593', '#77B7DF', '#FF98BF', '#D198C0'],
      ['#F6BD16', '#DCDC8C', '#FF9845', '#FFD298', '#E86452', '#EEA29D', '#FF99C3', '#D198BF', '#D1A8DF', '#945FB9', '#5D7092', '#5B8FF9', '#AEB9E5', '#A6CFFF', '#6DC8EC', '#A3D9E5', '#78B6E0', '#5AD8A6', '#8FCA8D', '#1E9493'],
      ['#1E9493', '#8FCA8D', '#5AD8A6', '#78B6E0', '#A3D9E5', '#A6CFFF', '#A6CFFF', '#AEB9E5', '#5B8FF9', '#5D7092', '#945FB9', '#D1A8DF', '#D198BF', '#FF99C3', '#EEA29D', '#E86452', '#FFD298', '#FF9845', '#DCDC8C', '#F6BD16'],
      ['#5AD8A6', '#1E9493', '#5B8FF9', '#5D7092', '#945FB9', '#E86452', '#FF9845', '#F6BD16', '#FFD298', '#DCDC8C', '#8FCA8D', '#A3D9E5', '#6DC8EC', '#78B6E0', '#A6CFFF', '#AEB9E5', '#EEA29D', '#D198BF', '#D1A8DF', '#FF99C3']
    ];
    const color = ref<string[]>([]);
    const chartOption = computed(() => {

      return {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        // dataZoom: [{
        //   type: 'inside'
        // }],
        legend: {
          show: false,
          selected: selected.value
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
        series: seriesData.value.map((i: any, index) => {
          return {
            name: i.name,
            data: i.data,
            type: 'line',
            showSymbol: false, // 是否显示折点
            color: color.value[index % 20],
            lineStyle: {
              color: color.value[index % 20]
            },
            areaStyle: {
              color: color.value[index % 20],
              opacity: 0.4
            },
            stack: props.s === '堆叠' ? 'Total' : ''
          };
        })
      };
    });

    const tableData = computed(() => {
      const data: any = [];
      seriesData.value.forEach((item: any, index) => {
        data.push({
          name: item.name,
          latest: item.data[item.data.length - 1],
          color: color.value[index % 20]
        });
      });
      return data;
    });

    const changeLegend = (index) => {
      active.value = index === active.value ? null : index;
      seriesData.value.forEach((i: any, ind) => {
        const b = active.value === null ? true : ind === active.value;
        selected.value[i.name] = b;
      });
    };
    const getData = () => {
      // 请求接口获取数据
      if (info.value.list && info.value.list.length) {
        for (const i of info.value.list) {
          if (i) {
            getHistoryValue(monitorId as string, i).then((res) => {
              if (res.code === 0) {
                const name = getTargetName(i);
                seriesData.value = seriesData.value.concat(dataToChartData(res.data, name) as any);
              }
            });

          }
        }
      }
    };

    onMounted(() => {
      info.value = getTargetData(targetType.value, targetName.value);
      getData();
      const n = Math.floor(Math.random() * 4);
      color.value = colorList[n];
    });

    return {
      info,
      loading,
      monitorId,
      active,
      selected,
      color,
      chartOption,
      tableData,
      changeLegend,
    };
  }
});
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: calc(100% - 76px);
}

.legend {
  width: 100%;
  height: 76px;
  padding: 0 20px;

  .legend-box {
    height: 54px;
  }
}

.line-chart24 {
  display: inline-block;
  width: calc(100% - 510px);
  height: 100%;
  vertical-align: top;
}

.legend24 {
  display: inline-block;
  width: 500px;
  height: 100%;
  padding: 0 10px;
  .legend-box {
    height: calc(100% - 25px);
  }
}

.legend-title {
  width: 100%;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: #3BA6F0;
  text-align: right;
  padding-right: 10px;
}

.legend-box {
  width: 100%;
  overflow-y: auto;
  font-size: 12px;

  .item {
    width: 100%;
    height: 18px;
    line-height: 18px;
    display: flex;
    cursor: pointer;

    &:hover {
      background-color: #F7F8FA;
    }

    .color {
      width: 30px;
      padding: 6px 9px;

      div {
        width: 14px;
        height: 6px;
      }
    }

    .name {
      flex-grow: 1
    }

    .latest {
      width: 150px;
      text-align: right;
      padding-right: 10px;
    }
  }

  .active {
    opacity: 1
  }

  .no-active {
    opacity: 0.5
  }
}
</style>
