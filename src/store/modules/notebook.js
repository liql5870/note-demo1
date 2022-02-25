import Notebook from '@/apis/notebooks'
import { Message } from 'element-ui'

const state = {
  // 声明了两个数据，一个笔记本，一个笔记的id
  notebooks: null,
  curBookId: null
}

// getters 相当于vue里面的computed,主要还是为了响应依赖.
const getters = {
  notebooks: state => state.notebooks || [],

  curBook: state => {
    if (!Array.isArray(state.notebooks)) return {}
    if (!state.curBookId) return state.notebooks[0] || {}
    return state.notebooks.find(notebook => notebook.id === state.curBookId) || {}
  }
}

const mutations = {
  // 设置笔记本，把传递过来的笔记本等于vuex中的笔记本
  setNotebooks (state, payload) {
    state.notebooks = payload.notebooks
  },
  // 添加一个笔记本，获取到state中的notebooks列表的数据，，然后对notebooks数组进行头部添加数据的操作，把新增的notebook插入进去。
  addNotebook (state, payload) {
    state.notebooks.unshift(payload.notebook)
  },
  // 对方传递笔记的id,和title过来，然后在state中找到这个值，然后在去修改它的title
  updateNotebook (state, payload) {
    const notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {}
    notebook.title = payload.title
  },
  // 这个并不是直接删除，而是使用了过滤的操作，把和那个要删除的不相等的笔记保留下来，相当于那个相等了被过滤掉不展示了
  deleteNotebook (state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
  },

  setCurBook (state, payload) {
    state.curBookId = payload.curBookId
  }
}

const actions = {
  getNotebooks ({ commit }) {
    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },
  // 这个里面的{commit}形参，其实是一种解构，正确的写法是写作context,然后下面去引用context.commit
  // payload是荷载，其实就是用来接收参数的，接收一个对象，这个对象中的属性，就是payload的属性之一
  addNotebook ({ commit }, payload) {
    return Notebook.addNotebook({ title: payload.title })
      .then(res => {
        commit('addNotebook', { notebook: res.data })
        Message.success(res.msg)
      }).catch(err => console.log(err))
  },

  updateNotebook ({ commit }, payload) {
    return Notebook.updateNotebook(payload.notebookId, { title: payload.title })
      .then(res => {
        commit('updateNotebook', {
          notebookId: payload.notebookId,
          title: payload.title
        })
        Message.success(res.msg)
      })
  },

  deleteNotebook ({ commit }, payload) {
    return Notebook.deleteNotebook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', { notebookId: payload.notebookId })
        Message.success(res.msg)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
