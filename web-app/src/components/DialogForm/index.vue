<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false"  :width="width">
    <slot name="form"></slot>
  </el-dialog>
</template>
<script>
  export default {
    name: 'DialogForm',
    components: {},
    props: {
        title: {
            type: String,
            default:''
        },
        width: {
            type: String,
            default:'610px'
        },
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleDialogOpen() {
        this.dialogVisible = true
      },
      handleDialogClose() {
        this.dialogVisible = false
      }
    }
  }

</script>

<style lang="scss" scoped>
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #E5E6EB;
  }

</style>
