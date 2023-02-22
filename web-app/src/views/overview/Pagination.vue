<template>
  <div class="pagination">
    <div class="level">
      <div class="level-l">
        <!--        共{{ total }}个条目-->
      </div>
      <div class="level-r">
        <el-button type="text" icon="el-icon-arrow-left" size="mini" :disabled="page === 1" @click="pageDown" />
        <div class="zeus-inline-block zeus-ml-15 zeus-mr-15">{{ page + ' / ' + maxPage }}</div>
        <el-button type="text" icon="el-icon-arrow-right" size="mini" :disabled="page === maxPage" @click="pageUp" />
      </div>
    </div>
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
    size: {
      type: Number,
      default() {
        return 5
      }
    },
    total: {
      type: [Number, String],
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    /* 计算出最大页数 */
    maxPage() {
      return Math.ceil(Number(this.total) / this.size)
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.page = val
      }
    }
  },
  methods: {
    pageDown() {
      this.page--
      this.handleCurrentChange()
    },
    pageUp() {
      this.page++
      this.handleCurrentChange()
    },
    handleCurrentChange() {
      this.$emit('handleCurrentChange', this.page)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  height: 48px;
  //line-height: 32px;
  position: relative;
  padding: 10px 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 12px;
  .level {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .level-l{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .level-r{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;

      ::v-deep.el-button{
        border-color: transparent!important;
      }
      ::v-deep.el-button--mini{
        padding: 6px 20px;
      }
    }
  }
}

</style>
