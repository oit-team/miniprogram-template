<template>
  <container classes="flex flex-col items-center justify-center">
    <image class="w-100px h-100px mb-6" src="/static/logo.png" />
    <view>
      <text class="text-lg text-[#8f8f94]">
        {{ title }}
      </text>
    </view>
    <van-button class="mt-2" @click="test()">
      测试
    </van-button>
  </container>
</template>

<script>
import { login } from '@/api/account'

export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  methods: {
    test() {
      login()
    },
  },
}
</script>

<style lang="scss">
</style>
