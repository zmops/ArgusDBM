<!-- 列表页面搜索栏输入框组件 -->
<template>
  <div>
    <el-input
      v-model.trim="farther.queryParams[keyName]"
      size="mini"
      :placeholder="placeholder ? placeholder : $t('tableView.input')+label"
      style="width:200px;"
      clearable
    ><span v-if="suffix != ''" slot="suffix">{{ suffix }}</span></el-input>
  </div>
</template>

<script>
export default {
  inject: ['farther'],
  props: {
    keyName: {
      type: String
    },
    suffix: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
