import { defineComponent } from 'vue';
import { getSummary } from '@/service/api';
import Chart from '@/components/chart/index.vue';

const APP_NAME = {
  dm: '达梦',
  mysql: 'MySQL',
  oracle: 'Oracle',
  pg: 'PostgreSQL',
  sqlserver: 'SQL Server',
};

export default defineComponent({
  name: 'DbStatus',
  setup() {

    const chartOption = ref({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        right: 0,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Rainfall',
          type: 'bar',
          data: [],
        },
        {
          name: 'Evaporation',
          type: 'bar',
          data: [],
        }
      ]
    });

    const getAlertRecently = () => {
      getSummary().then((res) => {

        if (res.code !== 0 || !res.data) {
          return;
        }
        const app = res.data.apps;

        // @ts-expect-error
        chartOption.value.xAxis[0].data = app.map(i => APP_NAME[i.app]);
        const series = [
          {
            name: '在线',
            type: 'bar',
            color: '#5AD8A6',
            data: app.map((i) => {
              return i.availableSize;
            })
          },
          {
            name: '离线',
            type: 'bar',
            color: '#E86452',
            data: app.map((i) => {
              return i.unAvailableSize + i.unReachableSize;
            })
          },
          {
            name: '禁用',
            type: 'bar',
            color: '#F6BD16',
            data: app.map((i) => {
              return i.unManageSize;
            })
          }
        ];
        // @ts-expect-error
        chartOption.value.series = series;
      });
    };

    onMounted(() => {
      getAlertRecently();
    });

    return () => (
      <a-col span={12} class="pr-base">
        <div class="mb-base h-296px column overflow-auto rounded-base bg-white px-base dark:bg-dark">
          <p class="py-md">数据库状态统计</p>
          <Chart style="width: 100%; height: calc(100% - 46px)" option={chartOption.value}/>
        </div>
      </a-col>
    );
  },
});
