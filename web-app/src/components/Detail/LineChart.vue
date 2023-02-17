<!--详情页趋势图组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div class="line-chart">
        <div>
          趋势图
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { getTargetData } from '@/utils/detail'
import GridItemStyle from '@/components/Detail/GridItemStyle'
export default {
  name: 'LineChart',
  components: {
    GridItemStyle
  },
  props: {
    /* 指标类型('单指标/指标组合') */
    targetType: {
      type: String,
      default: '指标组合'
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
.line-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  div{
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: 500;
    color: #1D2129;
  }
}
</style>
