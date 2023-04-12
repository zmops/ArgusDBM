<template>
  <div class="pb-bae ma-base h-full w-full bg-white px-base">
    <div class="mr-md flex items-center pb-base">
      <i
        class="i-custom:monitor-back mr-md cursor-pointer text-(base blue)"
        @click="$router.back()"
      />
      <span class="text-(base #1D2129) font-bold">{{ info.name }}</span>
      <span class="ml-md text-(14px blue) font-bold">{{ info.host }}</span>
    </div>
    <div class="h-62px w-full flex rounded-base bg-#ECEFF4 pa-base text-(base #4E5969)">
      <div v-for="(item, index) in dataTabs" :key="'tabs' + index" class="flex" @click="layouts = item.list;tabsId = item.title">
        <div v-if="index > 0" class="mt-5px h-32px w-2px bg-#DEDFE2" />
        <div class="h-42px min-w-160px cursor-pointer rounded-base text-center leading-42px hover:bg-white" :class="tabsId === item.title ? 'color-#0077FF bg-white' : ''">
          {{ item.title }}
        </div>
      </div>
    </div>
    <a-row direction="vertical">
      <a-col v-for="(item) in layouts" :key="item.i" :span="item.w" :style="{ height: (item.h * 30 + (item.h - 1) * 10) + 'px' }" class="mt-base overflow-hidden py-sm">
        <div class="mr-base h-full">
          <component :is="item.v" v-bind="{ targetType: item.t, targetName: item.k, s: item.s, w: item.w, dataObj }" />
        </div>
      </a-col>
    </a-row>
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

    const type = route.query.type;
    const monitorId = route.query.monitorId;

    const layouts = ref([]);
    const dataTabs = ref([]);

    const tabsId = ref('');
    const metrics = ref([]);
    const info = ref({});
    const dataObj = ref({});
    const getInfo = ()=> {
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
        console.log(item);
        if (item[0] === type) {
          if (!tabs.includes(item[1])) {
            tabs.push(item[1]);
          }
          arr.push(item);
          if (item[4] === 'Single' || item[4] === 'SingleGraph') {
            // if (item[2] === '单指标') {
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
    const getArr = () =>{
      // 获取所有的最新值
      if ( metrics.value.length) {
        for (const i of metrics.value) {
          getLatestValue( monitorId, i).then((res) => {
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
    onMounted(async()=>{

      await getInfo();
      await getArr();

      nextTick(()=>{
        layouts.value = dataTabs.value[0]?.list;
        tabsId.value = dataTabs.value[0]?.title;
      });
    });

    return {
      layouts,
      dataTabs,
      tabsId,
      info,
      dataObj
    };
  }
});
</script>
