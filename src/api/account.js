import { post } from './index'

export function login(params) {
  return post('/login', params)
}
