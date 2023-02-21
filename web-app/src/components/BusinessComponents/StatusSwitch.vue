<template>
  <div class="status-switch">
    <div class="enable item" :class="val2 ? 'enable-active' : ''" @click="change(true)">{{ leftText }}</div>
    <div class="disable item" :class="val2 ? '' : 'disable-active'" @click="change(false)">{{ rightText }}</div>
  </div>
</template>

<script>
export default {
  name: 'StatusSwitch',
  inject: ['farther'],
  props: {
    val: {
      type: [Boolean, Number],
      default() {
        return true
      }
    },
    /* 数据项的id名 */
    dataId: {
      type: [Number, String],
      default() {
        return null
      }
    },
    /* 切换按钮的事件名 */
    event: {
      type: String,
      default() {
        return null
      }
    },
    /* 左侧按钮名称 */
    leftText: {
      type: String,
      default: '启用'
    },
    /* 左侧按钮名称 */
    rightText: {
      type: String,
      default: '禁用'
    }
  },
  data() {
    return {
      val2: true
    }
  },
  watch: {
    val: {
      immediate: true,
      handler(v) {
        this.val2 = v
      }
    }
  },
  methods: {
    change(v) {
      if (this.val2 === v) {
        return false
      }
      this.val2 = !this.val2
      this.farther[this.event](this.dataId, this.val2)
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
