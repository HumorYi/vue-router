/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 17:21:05
 * @LastEditTime: 2020-05-10 18:42:12
 */
import Vue from 'vue'
import VueRouter from './vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    children: [
      {
        path: '/detail',
        name: 'newsDetail',
        component: {
          render(h) {
            return h('div', 'news detail')
          }
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    children: [
      {
        path: '/info',
        name: 'aboutInfo',
        component: {
          render(h) {
            return h('div', 'about info')
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
