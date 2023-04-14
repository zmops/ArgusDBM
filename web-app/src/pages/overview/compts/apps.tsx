import { defineComponent } from 'vue';
import { getMonitors } from '@/service/api';

export default defineComponent({
  name: 'Apps',
  props: ['type', 'name'],
  setup(props) {
    const apps = ref<any[]>([]);

    const loading = ref(true);

    const columns = [
      {
        title: '监控名称',
        dataIndex: 'name',
      },
      {
        title: 'IP/域名',
        dataIndex: 'ip',
      },
      {
        title: '最后在线时间',
        dataIndex: 'time',
      },
    ];

    const getAlertRecently = () => {
      getMonitors({ app: props.type, status: [2, 3], pageIndex: 0, pageSize: 8 }).then((res: any) => {
        const { code, data } = res;
        if (code === 0 && data) {
          apps.value = data.content.map((item) => {
            return {
              name: item.name || Math.random(),
              ip: item.host || Math.random(),
              time: item.gmtUpdate || Math.random(),
            };
          });

          loading.value = false;
        }
      });
    };
    onMounted(() => {
      getAlertRecently();
    });

    return () => (
      <a-col span={12}>
        <div class="mb-base h-296px column overflow-auto rounded-base bg-white px-base pb-base dark:bg-dark">
          <p class="flex-shrink-0 py-md">{props.name}</p>
          <a-table class="flex-1 overflow-hidden" loading={loading.value} columns={columns} data={apps.value}></a-table>
        </div>
      </a-col>
    );
  },
});
