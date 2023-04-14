import { defineComponent } from 'vue';
import { getSummaryStatic } from '@/service/api';

const ListColor: Record<string, string> = {
  'static.monitor.online': '#6CD2AB',
  'static.monitor.offline': '#DF8075'
};

export default defineComponent({
  name: 'NumList',
  setup() {

    const numList = ref<{ title: string; val: number; color?: string }[]>([]);

    const getNumList = () => {
      getSummaryStatic().then((res) => {
        if (res.data) {
          const counts = res.data;
          numList.value = [];
          counts.forEach((item) => {
            const i18nTitle = t(item.key);
            numList.value.push({
              title: i18nTitle,
              val: item.count,
              color: ListColor[item.key]
            });
          });
        }
      });
    };

    onMounted(() => {
      getNumList();
    });

    return () => (
      <a-row justify="start">
      {
        numList.value.map((item, index) => {
          return <a-col key={'col' + index} span={3} >
            <div class="mb-base h-130px overflow-auto rounded-base bg-white dark:bg-dark">
              <p class="h-48px pl-base text-12px leading-48px color-#4E5969">{item.title}</p>
              <span class="h-82px w-full flex-center pb-20px text-(center 26px) font-600" style={{ color: item.color }}>
                {item.val}
              </span>
            </div>
          </a-col>;
        })
      }
    </a-row>
    );
  },
});
