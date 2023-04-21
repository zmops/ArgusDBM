<template>
  <div class="monitor-detail h-full column flex-1 overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
    <div class="h-full column bg-white dark:bg-dark">
      <div class="h-50px flex flex-s-0 items-center pl-md">
        <i class="i-custom:monitor-back mr-md cursor-pointer text-(base blue)" @click="back()" />
        <span class="text-(base #1D2129) font-bold dark:text-white">{{ info.name }}</span>
        <span class="ml-md text-(14px blue) font-bold">{{ info.host }}</span>
      </div>
      <div v-if="dataTabs.length" class="w-full flex flex-s-0 px-md">
        <a-radio-group type="button" :default-value="dataTabs[0].title" class="pa-6px! text-18px! leading-40px!" size="large">
          <a-radio
            v-for="(item, index) in dataTabs" :key="'tabs' + index" :value="item.title"
            class="px-36px text-16px! leading-36px!" @click="layouts = item.list; tabsId = item.title"
          >
            {{ item.title }}
          </a-radio>
        </a-radio-group>
        <div class="flex-1 bg-[var(--color-fill-2)]" />
      </div>

      <a-row direction="vertical" class="flex-1 of-y-auto pl-md pr-4px">
        <a-col
          v-for="(item) in layouts" :key="item.i" :span="item.w"
          :style="{ height: (item.h * 30 + (item.h - 1) * 10) + 'px' }" class="mt-base"
        >
          <div class="mr-base h-full">
            <component :is="item.v" v-bind="{ targetType: item.t, targetName: item.k, s: item.s, w: item.w, dataObj }" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import TableView from '@/components/detail-compts/table-view.vue';
import Single from '@/components/detail-compts/single.vue';
import SingleGraph from '@/components/detail-compts/single-graph.vue';
import Graph from '@/components/detail-compts/graph.vue';
import { getLatestValue, getMonitor } from '@/service/api';
import { uuid } from '@/utils';
import detailLayout from '@/assets/csvData/detailLayout';

export default defineComponent({
  name: 'Detail',
  components: {
    Graph,
    TableView,
    Single,
    SingleGraph
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const type = route.query.type;
    const monitorId = route.query.monitorId;

    const layouts = ref([]);
    const dataTabs = ref([]);

    const tabsId = ref('');
    const metrics = ref([]);
    const info = ref({});
    const dataObj = ref({});

    const back = () => {
      router.go(-1);
    };

    const getInfo = () => {
      getMonitor(monitorId).then((res) => {
        if (res.code === 0 && res.data.monitor) {
          info.value = res.data.monitor;
        }
      });
      const data = detailLayout.split('\n');
      const arr = [];
      const tabs = [];
      const tabList = [];

      data.forEach((i) => {
        const item = i.split(',');

        if (item[0] === type) {
          if (!tabs.includes(item[1])) {
            tabs.push(item[1]);
          }
          arr.push(item);
          if (item[4] === 'Single' || item[4] === 'SingleGraph') {
            const m = item[3].split('.');
            if (!metrics.value.includes(m[1])) {
              metrics.value.push(m[1]);
            }
          }
        }
      });
      tabs.forEach((i) => {
        const list = [];
        arr.forEach((ii) => {
          if (ii.includes(i)) {
            list.push({
              x: Number(ii[7]), // 格栅位置
              y: Number(ii[6]), // 格栅位置
              w: Number(ii[8]), // 格栅宽度
              h: Number(ii[9]), // 格栅高度
              i: uuid(), // 格栅id
              t: ii[2], // 指标类型
              k: ii[3], // 指标名称
              v: ii[4], // 格栅视图类型
              s: ii[5] // 趋势图是否堆叠
            });
          }
        });
        tabList.push({ title: i, list });
      });
      dataTabs.value = tabList;
    };

    const getArr = () => {
      // 获取所有的最新值
      if (metrics.value.length) {
        for (const i of metrics.value) {
          getLatestValue(monitorId, i).then((res) => {
            if (res.code === 0 && res.data) {
              const fields = res.data.fields;
              const valueRows = res.data.valueRows[0].values;
              const obj = {};
              fields.forEach((item, index) => {
                obj[item.name] = {
                  unit: item.unit,
                  value: valueRows[index].origin
                };
              });

              dataObj.value = {
                ...dataObj.value,
                ...obj
              };
            }
          });
        }
      }
    };
    onMounted(async () => {

      await getInfo();
      await getArr();

      nextTick(() => {
        layouts.value = dataTabs.value[0]?.list;
        tabsId.value = dataTabs.value[0]?.title;
      });
    });

    return {
      layouts,
      dataTabs,
      tabsId,
      info,
      dataObj,
      back
    };
  }
});
</script>
