import axios from 'axios'
import { Message } from 'element-ui'

// axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
axios.defaults.withCredentials = true

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function request (url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const option = {
      url: url,
      method: type,
      validataStatus (status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
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
        reject({ msg: '网络异常' })
      })
  })
}
