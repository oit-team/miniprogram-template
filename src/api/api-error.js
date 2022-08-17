export default class ApiError {
  /**
   * @param {object} option 参数
   * @param {string} option.url 请求地址
   * @param {string} option.message 错误消息
   * @param {any} option.response 响应数据
   * @param {any} option.error 错误数据
   * @param {number} option.status http状态码
   * @param {string | number} option.code 自定义错误码
   */
  constructor(option) {
    this.url = option.url
    this.message = option.message
    this.response = option.response
    this.error = option.error
    this.status = option.status
    this.code = option.code
  }

  reject() {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(this)
  }
}
