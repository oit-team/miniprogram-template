const TOKEN_KEY = 'token'

const hasToken = () => {
  return !!uni.getStorageSync(TOKEN_KEY)
}

const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY)
}

const setToken = (token) => {
  uni.setStorageSync(TOKEN_KEY, token)
}

const clearToken = () => {
  uni.removeStorageSync(TOKEN_KEY)
}

export { hasToken, getToken, setToken, clearToken }
