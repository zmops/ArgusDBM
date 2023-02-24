<!--详情页最新值+趋势图组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div class="text-chart">
        <LineChart :target-name="targetName" />
        <div class="text">
          {{ val }}
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
  name: 'SingleGraph',
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
    },
    /* 最新数据对象 */
    dataObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      info: {},
      val: ''
    }
  },
  watch: {
    dataObj: {
      immediate: true,
      deep: true,
      handler(v) {
        const name = this.targetName.split('.')
        const item = v[name[2]]
        if (item) {
          this.val = item.value + item.unit
        }
      }
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
    top: calc(50% - 15px);
    left: 0;
  }
}
</style>
