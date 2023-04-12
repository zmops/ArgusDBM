import { defineComponent } from 'vue';
import { getSummary } from '@/service/api';
import Chart from '@/components/chart/index.vue';

export default defineComponent({
  name: 'DbStatus',
  setup() {

    const chartOption = ref({

      tooltip: {
        trigger: 'axis'
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
          data: [
          ],

        },
        {
          name: 'Evaporation',
          type: 'bar',
          data: [
          ],

        }
      ]
    });

    const getAlertRecently = () => {
      getSummary().then((res: any) => {

        const app = res.data.apps;

        // @ts-expect-error
        chartOption.value.xAxis[0].data = app.map(i=>i.app);
        chartOption.value.series = app.map((i) => {
          return {
            type: 'bar',
            data: [i.unManageSize, i.unAvailableSize, i.unReachableSize],
            name: i.app,

          };
        });

      });
    };

    onMounted(() => {
      getAlertRecently();
    });

    return () => (
      <a-col span={12} class="pr-base">
        <div class="mb-base h-296px column overflow-auto rounded-base bg-white px-base dark:bg-dark">
          <p class="py-md">数据库状态统计</p>
          <Chart style="width: 100%; height: calc(100% - 46px)" option={chartOption.value} />
        </div>
      </a-col>
    );
  },
});
