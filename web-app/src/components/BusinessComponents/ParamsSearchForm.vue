<template>
  <div class="setting-form">
    <el-form :inline="true" :model="farther.form" class="demo-form-inline">
      <el-form-item v-for="(item, index) in params" :key="index" :label="item.label" size="mini">
        <component :is="item.componentName" v-bind="item" />
      </el-form-item>
      <el-form-item class="line-button-wrapper">
        <el-button size="mini" class="search-btn" @click.prevent="search">{{ $t('tableView.search') }}</el-button>
        <el-button size="mini" class="reset-btn" @click.prevent="reset">{{ $t('tableView.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: ['farther'],
  components: {
    RadioList: () => import('@/components/BusinessComponents/RadioList'),
    InputTemplate: () => import('@/components/BusinessComponents/InputTemplate'),
    SelectTemplate: () => import('@/components/BusinessComponents/SelectTemplate')
  },
  props: {
    params: {
      type: Array
    }
  },
  methods: {
    search() {
      this.$emit('search')
    },
    reset() {
      this.$emit('rest')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.setting-form {
  @include flexContainerRow;
  width: 100%;
  border: 1px solid #ccd2d8;
  padding: 10px 0 0 16px;
  font-size: 12px;
  background-color: #ffffff;
}

.el-form-item {
  margin-bottom: 10px !important;
}

.el-form-item__content {
  line-height: none;
}

.search-btn {
  background: #0077FF;
  border: 1px solid #0077FF;
  border-radius: 2px;
  color: white;
}

.reset-btn {
  background: #7B8A9F;
  border: 1px solid #7B8A9F;
  border-radius: 2px;
  color: #fff;
}

.line-button-wrapper ::v-deep .el-form-item__content {
  line-height: 1 !important;
}
</style>
