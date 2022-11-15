<template>
  <view class="container" :class="[{ 'container-flex': flex }, classes]" :style="[{ minHeight }]">
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />

    <slot />
  </view>
</template>

<script>
import Toast from '@/wxcomponents/vant/toast/toast'
import Dialog from '@/wxcomponents/vant/dialog/dialog'

export default {
  name: 'Container',

  options: {
    virtualHost: true,
  },

  props: {
    flex: Boolean,
    classes: String,
    // 修复自定义导航栏时高度不正确
    safeHeight: Boolean,
  },

  computed: {
    minHeight() {
      const calcHeight = () => {
        const sysInfo = wx.getSystemInfoSync()
        return `${sysInfo.safeArea.height}px`
      }
      return this.safeHeight ? calcHeight() : '100vh'
    },
  },

  created() {
    this.init()

    this.$nextTick(this.setListener)
  },

  methods: {
    init() {
      const container = this.$scope

      Toast.setDefaultOptions({
        context: container,
        selector: '#van-toast',
      })

      Dialog.setDefaultOptions({
        context: container,
        selector: '#van-dialog',
      })
    },
    /**
     * 绑定到页面事件
     */
    setListener() {
      const options = this.$parent.$options

      // onShow时重新配置
      if (!Array.isArray(options.onShow)) options.onShow = []
      options.onShow.push(this.init.bind(this))

      // onHide时关闭toast
      if (!Array.isArray(options.onHide)) options.onHide = []
      options.onHide.push(() => {
        Toast.clear()
      })
    },
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  box-sizing: border-box;
}

.container-flex {
  display: flex;
  flex-direction: column;
}
</style>
