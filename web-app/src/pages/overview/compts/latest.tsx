import { defineComponent } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { getAlerts } from '@/service/api';

const defaultQueryParams = {
  order: 'desc',
  pageIndex: 0,
  pageSize: 15
};
export default defineComponent({
  name: 'Latest',
  setup() {

    const alarmTableData = ref<any>([]);

    const loading = ref(true);
    const queryParams = reactive(cloneDeep(defaultQueryParams));
    const total = ref(0);
    const columns = [
      {
        title: '告警级别',
        dataIndex: 'level',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '告警时间',
        dataIndex: 'time',
      },
      {
        title: '告警内容',
        dataIndex: 'content',
      },
    ];

    const getAlertRecently = ()=>{
      loading.value = true;
      getAlerts(queryParams).then((res: any) => {
        if ( res.data) {
          const content = res.data.content;
          total.value = res.data.totalElements;
          content.forEach((item: any) => {
            alarmTableData.value.push({
              level: t('alert.priority.' + item.priority ),
              status: t('alert.status.' + item.status),
              content: item.content,
              time: item.gmtUpdate
            });
          });

          loading.value = false;
        }
      });
    };
    const pageChange = (page: number) => {
      queryParams.pageIndex = page - 1;
      getAlertRecently();
    };
    onMounted(() => {
      getAlertRecently();
    });

    return () => (
      <a-col span={12} class="pr-base">
      <div class="mb-base h-300px column overflow-auto rounded-base bg-white px-base pb-base dark:bg-dark">
         <p class="py-md">最新告警</p>
        <a-table class="flex-1 overflow-hidden" columns={columns} loading={loading.value} data={alarmTableData.value} pagination={{ total: total.value, pageSize: 15, onChange: pageChange }} ></a-table>
      </div>
    </a-col>
    );
  },
});
