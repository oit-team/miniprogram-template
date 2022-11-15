import Toast from '@/wxcomponents/vant/toast/toast'

let promiseLoadingDelay = null

/**
 * 根据promise状态显示loading效果
 * @param {Promise | Promise[]} promises
 * @param config
 */
export function promiseLoading(promises, config) {
  config = typeof config === 'string' ? { message: config } : config

  promiseLoadingDelay = setTimeout(() => {
    Toast.loading({
      message: '正在加载...',
      duration: 60000,
      forbidClick: true,
      ...config,
    })
  }, Number(config?.delay ?? 200))

  const closeToast = () => {
    clearTimeout(promiseLoadingDelay)
    Toast.clear()
    setTimeout(Toast.clear, 200)
  }

  // 数组时执行all方法
  if (Array.isArray(promises)) return Promise.all(promises).finally(closeToast)
  return promises.finally(closeToast)
}

/**
 * 断言
 * @param {boolean} check 断言结果
 * @param {string} msg 失败提示
 * @returns
 */
export function assert(check, msg) {
  return new Promise((resolve, reject) => {
    return check ? resolve() : reject(msg)
  })
}

export async function unwrapPromise(promise) {
  const [err, res] = await promise
  if (err) throw err
  return res
}

export function wxPayment(data) {
  const {
    nonceStr,
    timeStamp,
    prepayid,
    paySign,
  } = data

  return unwrapPromise(
    uni.requestPayment({
      provider: 'wxpay',
      appid: 'wx1ad4eaba2eb92f4f',
      // 微信支付商户号
      partnerid: '1630675966',
      // 随机字符串
      nonceStr,
      // 统一下单订单号
      package: `prepay_id=${prepayid}`,
      // 时间戳（单位：秒）
      timeStamp: String(timeStamp),
      // 签名
      signType: 'RSA',
      paySign,
    }),
  )
}
