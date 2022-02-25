// auth.js 方法封装了一些关于认证登录的api操作。
// 引入了request api,这个api中封装了关于axios的用法和操作。
// 所以，一开始就需要去创建这个request操作的用法
import request from '@/helpers/request'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}
export default {
  register ({ username, password }) {
    return request(URL.REGISTER, 'POST', {
      username,
      password
    })
  },
  login ({ username, password }) {
    return request(URL.LOGIN, 'POST', {
      username,
      password
    })
  },
  logout () {
    return request(URL.LOGOUT)
  },
  getInfo () {
    return request(URL.GET_INFO)
  }
}
