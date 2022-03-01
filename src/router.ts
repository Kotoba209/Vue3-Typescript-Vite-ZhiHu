import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home.vue'
import CreatePost from './views/CreatePost.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import PostDetail from './views/PostDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    }
  ]
})

export default router
