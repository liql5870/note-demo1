import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import NotebookList from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TashDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/notebooks',
    name: 'notebooks',
    component: NotebookList
  },
  {
    path: '/note',
    component: NoteDetail
  },
  {
    path: '/trash',
    component: TrashDetail
  }

]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
