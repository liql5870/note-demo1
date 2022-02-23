import request from '@/helpers/request.js'
import { friendlyDate } from '@/helpers/util'

const URL = {
  GET: '/notebooks',
  ADD: '/NOTEBOOKS',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll () {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => notebook1.createAt < notebook2.createAt ? 1 : -1)
          res.data.forEach(notebook => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updateNotebook (notebookId, { title = '' } = { title: '' }) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteNotebook (notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNote ({ notebookId }, {
    title = '',
    content = ''
  } = {
    title: '',
    content: ''
  }) {
    return new Promise((resolve, reject) => {
      request(URL.ADD.replace(':notebookId', notebookId), 'POST', {
        title,
        content
      })
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
