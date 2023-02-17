<!-- 详情页信息框样式 -->
<template>
  <div class="grid-item-style">
    <div class="title">
      {{ title }}
      <el-tooltip placement="right">
        <div slot="content">
          <div v-html="compiledMarkdown" />
        </div>
        <i v-show="explain" class="el-icon-warning-outline" />
      </el-tooltip>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
export default {
  name: 'GridItemStyle',
  props: {
    /* 标题 */
    title: {
      type: String,
      default: ''
    },
    /* 说明 */
    explain: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    compiledMarkdown() {
      return marked.parse(this.explain)
    }
  },
  created() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.grid-item-style {
  width: 100%;
  height: 100%;
  border: #E5E6EB 1px solid;
  border-radius: 4px;

  .title{
    height: 42PX;
    line-height: 42px;
    width: 100%;
    font-size: 14px;
    color: #4E5969;
    padding: 0 14px;
  }

  .content{
    width: 100%;
    height: calc( 100% - 42px);
  }
}
</style>
