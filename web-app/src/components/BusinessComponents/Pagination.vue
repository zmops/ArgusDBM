<template>
  <div class="pagination-container">
    <el-pagination
      style="padding: 8px 16px 12px 0;"
      :current-page="currentPage"
      :page-sizes="[10, 15, 30, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default() {
        return 1
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 15
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.pagination-container ::v-deep .el-pager {
  color: #606266;
}

.pagination-container {
  background-color: #ffffff;
  width: 100%;
  // border: 1px solid #CCD2D8;
  border-top: none;
  @include flexContainerRowEnd;
}
</style>
