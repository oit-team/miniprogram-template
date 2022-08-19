import Axios from 'luch-request'
import ApiError from './api-error'

// 创建接口错误封装对象
function createApiError(option) {
  return new ApiError(option).reject()
}

const axiosInstance = new Axios({
  baseURL: process.env.VUE_APP_API_URL,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  config.header.token = uni.getStorageSync('token')
  return config
}, (error) => {
  return createApiError({ error })
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  if (response.data.head?.status !== 0) {
    return createApiError({
      response,
      message: response.data.head.msg,
      code: response.data.head.status,
    })
  }
  return response
}, async (error) => {
  return createApiError({
    error,
    url: error.config.fullPath,
    message: error.errMsg,
  })
})

/**
 * post请求封装
 * @param {string} url 接口地址
 * @param {object} data 参数
 * @param {object} config 请求配置
 */
export function post(url, data, config = {}) {
  const userData = {}

  const wrapData = {
    head: {
      aid: userData.id,
      cmd: config.cmd,
      ver: '1.0',
      ln: 'cn',
      mod: 'app',
      de: '2019-10-16',
      sync: 1,
      uuid: userData.brandId,
      chcode: 'ef19843298ae8f2134f',
    },
    con: data,
  }

  return axiosInstance
    .post(url, wrapData, config)
    .then(res => res.data)
}

// 捕获promise错误
wx.onUnhandledRejection(({ reason }) => {
  // 处理接口错误
  if (reason instanceof ApiError) {
    // 弹出提示
    uni.showToast({
      title: reason.message,
      icon: 'error',
    })
  }
})
