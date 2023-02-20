<template>
  <div class="status-text">{{ val }}</div>
</template>

<script>
import { MONITORS_STATUS } from '@/const/const'

export default {
  name: 'StatusText',
  inject: ['farther'],
  props: {
    prop: {
      type: [String, Number],
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      val: ''
    }
  },
  watch: {
    prop: {
      immediate: true,
      handler(v) {
        const item = MONITORS_STATUS.find((i) => {
          return i.key === v
        })
        if (item) {
          this.val = item.value
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.status-text {

}
</style>
