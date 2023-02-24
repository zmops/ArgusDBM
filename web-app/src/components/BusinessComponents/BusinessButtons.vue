<template>
  <div class="buttons">
    <el-button v-for="(btn, index) in buttons" :key="index" size="mini" type="info" @click="handleClick(btn)">
      <svg-icon :icon-class="btn.icon" style="font-size: 14px" />
      {{ btn.label }}
    </el-button>
  </div>
</template>
<script>
export default {
  inject: ['farther'],
  props: {
    buttons: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },

  methods: {
    handleClick(obj) {
      this.farther[obj.event]()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.buttons {
  margin-bottom: 10px;
  padding-left: 12px;
  ::v-deep .el-button--info{
    background-color: #E5E6EB!important;
    border-color: #E5E6EB!important;
    color: #4E5969!important;
  }
}
</style>
