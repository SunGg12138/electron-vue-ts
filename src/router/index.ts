import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/tools/search-engine',
    children: [
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import(/* webpackChunkName: "about" */ '../views/tools/ToolsView.vue'),
    children: [
      {
        path: '/tools/search-engine',
        name: 'search-engine',
        component: () => import(/* webpackChunkName: "about" */ '../views/tools/SearchEngineView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
