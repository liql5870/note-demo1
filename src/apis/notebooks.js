// 引入了request封装的api
import request from '@/helpers/request.js'
// 引入了日期处理的api
import { friendlyDate } from '@/helpers/util'
// 提前把Ulr声明为变量
const URL = {
  GET: '/notebooks',
  ADD: '/NOTEBOOKS',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  // getAll 函数是用来获取全部的notebook数据的，它返回一个promise对象，
  getAll () {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => {
            return notebook1.createAt - notebook2.createAt
          })
          res.data.forEach((notebook) => {
            notebook.createdAtFriendly = friendlyDate(notebook.createdAt)
            notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
          })
          resolve(res)
        }
        )
        .catch(err => reject(err))
    })
  },
  updateNotebook (notebookId, { title = '' } = { title: '' }) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
  },
  deleteNotebook (notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNotebook ({ title = '' } = { title: '' }) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', { title })
        .then(res => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  }
}
