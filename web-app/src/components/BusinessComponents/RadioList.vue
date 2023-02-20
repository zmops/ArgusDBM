<!-- 列表页面搜索栏选择框组件 -->
<template>
  <el-radio-group v-model="farther.queryParams[keyName]" size="mini" fill="#0077FF">
    <el-radio-button
      v-for="(item, index) in arrayData"
      :key="index"
      :label="item.key"
    >{{ item.value }}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  inject: ['farther'],
  props: {
    keyName: {
      type: String
    },
    arrayData: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
