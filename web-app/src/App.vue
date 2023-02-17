<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
// collapse样式调整
.el-collapse-item__header{
  background-color: #fafafa;
  border-bottom: 0px;
  padding-left: 10px;
}
.el-collapse-item__content {
    padding: 10px;
}
.el-collapse-item{
  border-right: 1px solid #e6ebf5;
  border-left: 1px solid #e6ebf5;
  border-bottom: 1px solid #e6ebf5;
}
.el-collapse-item__wrap {
    border-bottom: 0px;
}
//code标签样式调整
code {
    margin: 0 4px;
    padding: 2px 4px;
    font-size: 90%;
    background-color: #f7f7f7;
    border: 1px solid #eee;
    border-radius: 2px;
}
</style>
