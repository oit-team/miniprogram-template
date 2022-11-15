import Vue from 'vue'
import Vuex from 'vuex'
import { clearToken, setToken } from '@/utils/token'
import { unwrapPromise } from '@/utils/helper'
import { login as userLogin, wxLogin } from '@/api/account'
import Toast from '@/wxcomponents/vant/toast/toast'

Vue.use(Vuex)

const plugins = process.env.NODE_ENV !== 'production' ? [Vuex.createLogger()] : []

export default new Vuex.Store({
  plugins,

  state: {
    userInfo: {},
  },

  getters: {
    // 是否已登录
    logged: state => Object.keys(state.userInfo).length > 0,
  },

  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setWorkingStatus(state, payload) {
      state.userInfo.workingState = payload
    },
  },

  actions: {
    // 账号登录
    async login(ctx, form) {
      try {
        const res = await userLogin(form)
        setToken(res.body.token)
        ctx.commit('setUserInfo', res.body.resultList)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    // 微信登录
    async wxLogin(ctx, form) {
      // 先调用登录
      const loginPromise = unwrapPromise(uni.login({ provider: 'weixin' }))

      const { encryptedData, iv } = await unwrapPromise(uni.getUserProfile({
        desc: '登录小程序',
        lang: 'zh_CN',
      })).catch((err) => {
        Toast.fail('取消授权')
        throw err
      })

      const { code } = await loginPromise

      const res = await wxLogin({
        encryptedData,
        iv,
        jsCode: code,
      })

      setToken(res.body.token)

      ctx.commit('setUserInfo', res.body.resultList)
    },
  },
})
