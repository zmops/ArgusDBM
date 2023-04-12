import { defineComponent } from 'vue';
import { useLoading } from '@/hooks';
import { getAlertsSummary } from '@/service/api';
import Chart from '@/components/chart/index.vue';

export default defineComponent({
  name: 'NotClose',
  setup() {

    const isDark = ref(false);
    const { loading, endLoading } = useLoading(true);

    let chartOption = {};

    onMounted(() => {
      getAlertsSummary().then((res) => {
        if (res.data) {
          const summary = res.data;
          chartOption = {
            xAxis: [{
              type: 'category',
              data: ['紧急告警', '严重告警', '警告告警']
            }],
            yAxis: {
              type: 'value'
            },
            tooltip: {
              show: true,
              trigger: 'axis',
            },
            series: [

              {
                type: 'bar',
                barWidth: 50,
                data: [{
                  value: summary.priorityEmergencyNum,
                  name: '紧急告警',
                  itemStyle: {
                    color: isDark ? '#C72222' : '#C72222',
                  }
                },
                {
                  value: summary.priorityCriticalNum,
                  name: '严重告警',
                  itemStyle: {
                    color: isDark ? '#E37045' : '#E37045',
                  }
                }, {
                  value: summary. priorityWarningNum,
                  name: '警告告警',
                  itemStyle: {
                    color: isDark ? '#FBBC0A' : '#FBBC0A',
                  }
                }
                ],
              },

            ],
          };

          endLoading();
        }

      });
    });

    return () => (
  <a-col span={12}>
    <a-spin loading={loading.value} style="width: 100%">
      <div class="mb-base h-296px w-full overflow-auto rounded-base bg-white px-base dark:bg-dark">
        <p class="py-md">未关闭告警数量</p>
        <Chart style="width: 100%; height: calc(100% - 46px)" option={chartOption} />
      </div>
    </a-spin>
  </a-col>
    );
  },
});
