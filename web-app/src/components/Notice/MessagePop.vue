<template>
  <transition name="fade">
    <div
      v-if="msgShow == 1"
      class="msgpop-wrapper"
      :class="{ active: show }"
    >
      <div class="msgpop-title-wrapper">
        <span class="msgpop-title"> 消息提醒 ({{ msgObj.type }})</span><svg-icon
          icon-class="close"
          class="msgpop-close"
          @click="close"
        />
      </div>
      <div class="msgpop-content">
        {{ msgObj.msg }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 250
    },
    width: {
      type: Number,
      default: 190
    },
    msgObj: {
      type: Object
    },
    msgShow: {
      type: Number
    }
  },
  computed: {
    show() {
      return !!this.msgShow
    }
  },
  methods: {
    close() {
      this.$emit('removeMsg')
    }
  }
}
</script>

<style lang="scss" scoped>
.msgpop-wrapper {
    position: fixed;
    bottom: 58px;
    right: -300px;
    width: 300px;
    background: #fff;
    box-shadow: 2px 0 2px #5a9ce6;
    border-radius: 4px;
    z-index: 9999999;
    display: none;
    transition-duration: 1s;
    &.active {
        display: block;
        animation: move 0.3s linear forwards;
    }
    .msgpop-title {
        padding-left: 10px;
        font-size: 14px;
        line-height: 32px;
    }
    .msgpop-title-wrapper {
        position: relative;
        height: 32px;
        background: #e1e2ec;
        border-bottom: 1px solid #f2f2f2;
    }
    .msgpop-close {
        position: absolute;
        font-size: 16px;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }
    .msgpop-content {
        height: 72px;
        margin: 10px;
        line-height: 18px;
        font-size: 12px;
        color: #424242;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
@keyframes move {
    from {
        right: -300px;
        opacity: 0;
    }
    to {
        right: 20px;
        opacity: 1;
    }
}
</style>
