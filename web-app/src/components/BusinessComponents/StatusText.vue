<template>
  <div class="status-text">{{ val2 }}</div>
</template>

<script>
import { MONITORS_STATUS } from '@/const/const'

export default {
  name: 'StatusText',
  inject: ['farther'],
  props: {
    val: {
      type: [String, Number],
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      val2: ''
    }
  },
  watch: {
    val: {
      immediate: true,
      handler(v) {
        const item = MONITORS_STATUS.find((i) => {
          return i.key === v
        })
        if (item) {
          this.val2 = item.value
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
