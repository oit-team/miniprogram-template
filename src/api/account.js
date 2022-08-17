import API_SERVICE from './API_SERVICE'
import { post } from './index'

export function login(params) {
  post[API_SERVICE.SYSTEM]('/login', params)
}
