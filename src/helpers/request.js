// 引入了axios,安装了axios
import axios from 'axios'
// 引入了element-ui组件
// 这里的一个问题就是，应该如何引入并且使用或者修改element-ui组件库
import { Message } from 'element-ui'

// 对于所有的post请求，设置 请求头header的content-type
// axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded'
// 设置默认的基础链接。后续的链接都是在这个后面添加的,这个是服务端的线上地址，
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
// 这个是用来提交跨域的请求的，客户端添加这个，并且再服务器上去添加 Access-Control-allow-Origin 这个就是cors跨域
axios.defaults.withCredentials = true

// 封装一个request方法，该方法用来去请求服务器的资源，其他所有页面都会调用该方法进行处理，无论是post，还是get请求
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function request (url, type = 'GET', data = {}) {
  // 它接受三个参数，第一个是URL地址，第二个是类型并设置默认值为'GET'，第三个是一个对象，默认是空对象
  return new Promise((resolve, reject) => {
    // 它返回一个promise对象， 声明一个对象，该对象存在一下属性和方法，使用promise就是为了二次的链式调用
    const option = {
      // 设置option.url = 传递过来的URL
      url: url,
      // 设置optio.methods = type
      method: type,
      // 这个是和后端约定的，使用状态码进行识别，用来对状态码进行判断
      validataStatus (status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      // 这里是因为get请求发送的变量名是params
      option.params = data
    } else {
      // 其他的请求不会去发送这个东西，所以直接让data的值登等于option.data
      option.data = data
    }
    axios(option)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          Message.error(res.data.msg)
          reject(res.data)
        }
      })
      .catch(err => {
        Message.error('网络异常')
        // eslint-disable-next-line prefer-promise-reject-errors
        // reject({ msg: '网络异常' })
        reject(err)
      })
  })
}
