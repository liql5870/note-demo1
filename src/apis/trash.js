import request from '@/helpers/request'
import { friendlyDate } from '@/helpers/util'

// 给几个链接声明了变量，这样可以直接进行使用
const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  // 创建一个getAll 方法，返回一个promise对象
  getAll () {
    return new Promise((resolve, reject) => {
      // 调用request方法传入 /notes/trash url
      request(URL.GET)
        // 如果代码执行成功的话，将会从服务器端获取列表，并以res为形参，进行数据处理
        .then(res => {
          // 获取的data数据是一个数据，会进行处一个排序处理 ,根据笔记的创建时间createdAt值，a-b是从大到小排列，进行判断
          res.data = res.data.sort((note1, note2) => {
            return note1.createdAt - note2.createdAt
          })
          // 对获取的数据进行遍历操作执行foreach方法，没有返回值
          res.data.forEach(note => {
            // 对获取到的note也就是笔记的时间进行处理，通过friendlyDate方法进行处理。
            note.createdAtFriendly = friendlyDate(note.createdAt)
            note.updatedAtFriendly = friendlyDate(note.updatedAt)
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },

  deleteNote ({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },

  revertNote ({ noteId }) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  }

}
