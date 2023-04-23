import { defineComponent } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { getAlerts } from '@/service/api';

const defaultQueryParams = {
  order: 'desc',
  pageIndex: 0,
  pageSize: 5
};

interface alarmTableDataInterface {
  level: string;
  status: string;
  time: string;
  content: string;
}
export default defineComponent({
  name: 'Latest',
  setup() {

    const alarmTableData = ref<Partial<alarmTableDataInterface[]>>([]);

    const loading = ref(true);
    const queryParams = reactive(cloneDeep(defaultQueryParams));
    const total = ref(0);
    const columns = [
      {
        title: '告警级别',
        dataIndex: 'level',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
      },
      {
        title: '告警时间',
        dataIndex: 'time',
        width: 180,
      },
      {
        title: '告警内容',
        dataIndex: 'content',
      },
    ];

    const getAlertRecently = ()=>{
      loading.value = true;
      getAlerts(queryParams).then((res) => {
        if ( res.data) {
          const content = res.data.content;
          total.value = res.data.totalElements;
          alarmTableData.value = content.map((item) => {
            return ({
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
        <a-table class="flex-1 overflow-hidden" virtual-list-props={{ height: 400 }} columns={columns} loading={loading.value} data={alarmTableData.value} pagination={{ total: total.value, pageSize: 5, onChange: pageChange }} ></a-table>
      </div>
    </a-col>
    );
  },
});
