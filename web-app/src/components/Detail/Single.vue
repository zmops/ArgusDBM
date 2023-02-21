<!--详情页最新值组件-->
<template>
  <GridItemStyle :title="info.title" :explain="info.explain">
    <template v-slot:content>
      <div class="text-value">
        <div>
          {{ val }}
        </div>
      </div>
    </template>
  </GridItemStyle>
</template>

<script>
import { getTargetData } from '@/utils/detail'
import GridItemStyle from '@/components/Detail/GridItemStyle'

export default {
  name: 'Single',
  components: {
    GridItemStyle
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
  // computed: {
  //   val() {
  //     const name = this.targetName.split('.')
  //     const item = this.dataObj[name[2]]
  //     return item.value + item.unit
  //   }
  // },
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
.text-value {
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
