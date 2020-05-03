/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 17:21:05
 * @LastEditTime: 2020-05-04 03:13:28
 */
import Vue from 'vue'
import VueRouter from './vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'news',
        name: 'news',
        component: News,
        children: [
          {
            path: '/detail',
            name: 'news-detail',
            component: NewsDetail
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
