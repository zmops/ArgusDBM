<template>
  <div class="status-switch">
    <div class="enable item" :class="val ? 'enable-active' : ''" @click="change(true)">{{ $t('tableView.enable') }}</div>
    <div class="disable item" :class="val ? '' : 'disable-active'" @click="change(false)">{{ $t('tableView.disable') }}</div>
  </div>
</template>

<script>
export default {
  name: 'StatusSwitch',
  inject: ['farther'],
  props: {
    status: {
      type: [Boolean, Number],
      default() {
        return true
      }
    },
    dataId: {
      type: [Number, String],
      default() {
        return null
      }
    },
    event: {
      type: String,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      val: true
    }
  },
  watch: {
    status: {
      immediate: true,
      handler(v) {
        this.val = v
      }
    }
  },
  methods: {
    change(v) {
      if (this.val === v) {
        return false
      }
      this.val = !this.val
      this.farther[this.event](this.dataId, this.val)
      // this.$emit('changeStatus', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
.status-switch {
  font-size: 12px;
  cursor: pointer;

  .item{
    width: 34px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    display: inline-block;
    background-color: #E5E6EB;
    color: #86909C;
  }

  .enable {
    border-radius: 4px 0 0 4px;
  }

  .disable {
    border-radius: 0 4px 4px 0;
  }

  .enable-active {
    background-color: #3BA6F0;
    color: #fff;
  }

  .disable-active {
    background-color: #AD2E2E;
    color: #fff;
  }
}
</style>
