<!-- 详情页信息框样式 -->
<template>
  <div class="grid-item-style h-full">
    <div class="title">
      {{ title }}
      <a-tooltip position="bottom">
        <template #content>
          <div v-html="compiledMarkdown" />
        </template>
        <icon-info-circle v-show="explain" />
      </a-tooltip>
    </div>
    <div class="content relative">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

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
  setup(props) {
    const compiledMarkdown = ref('');

    watchEffect(() => {
      compiledMarkdown.value = marked(props.explain);
    });
    return {
      compiledMarkdown
    };
  }

};
</script>

<style lang="scss" scoped>
.grid-item-style {
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
