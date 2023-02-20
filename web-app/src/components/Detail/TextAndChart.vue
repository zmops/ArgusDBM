<!--详情页最新值+趋势图组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div class="text-chart">
        <LineChart />
        <div class="text">
          50%
        </div>
      </div>
    </template>
  </GridItemStyle>

</template>

<script>
import GridItemStyle from '@/components/Detail/GridItemStyle'
import LineChart from '@/components/DetailCharts/LineChart'
import { getTargetData } from '@/utils/detail'
export default {
  name: 'TextAndChart',
  components: {
    GridItemStyle,
    LineChart
  },
  props: {
    /* 指标类型('单指标/指标组合') */
    targetType: {
      type: String,
      default: '单指标'
    },
    /* 指标名称 */
    targetName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      info: {}
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.info = getTargetData(this.targetType, this.targetName)
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.text-chart {
  width: 100%;
  height: 100%;
  position: relative;

  .text {
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: 500;
    color: #3BA6F0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
