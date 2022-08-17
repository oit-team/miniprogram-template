<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view>
      <text class="title">
        {{ title }}
      </text>
    </view>
    <van-button @click="test()">
      测试
    </van-button>
  </view>
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
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
