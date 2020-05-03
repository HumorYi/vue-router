/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 17:21:20
 * @LastEditTime: 2020-05-03 15:42:26
 */
// 插件其实是一个类，类中必须实现 install 静态方法 才能被 Vue.use() 挂载
import link from './link'
import view from './view'

let Vue = null

/**
 * VueRouter 类，也叫路由插件
 * 1、实现 install 静态方法，在根实例创建前将 router 实例 挂载到 Vue 原型上，实现子实例 共享 router 实例
 * 2、创建全局组件（路由跳转、渲染路由组件）
 */
class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = ''
    this.routeMap = new Map()

    this.init()
  }

  static install(_Vue) {
    Vue = _Vue

    VueRouter.mixin()

    Vue.component('router-link', link)
    Vue.component('router-view', view)
  }
  // 为什么要⽤混⼊⽅式写？主要原因是use代码在前，Router实例创建在后，⽽install逻辑⼜需要⽤到该实例
  static mixin() {
    Vue.mixin({
      beforeCreate() {
        // 只有根实例才有 router，将 router 实例挂载到 Vue 原型上，共享 router 实例
        if (this.$options.router) {
          Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  init() {
    this.setRouteMap(this.$options.routes)
    this.reactive()
    this.watchUrl()
  }

  verifyRoute(route) {
    if (this.routeMap.get(route.path)) {
      throw new Error('路由path：' + route.path + ' 已存在')
    }

    if (this.routeMap.get(route.name)) {
      throw new Error('路由name：' + route.name + ' 已存在')
    }
  }

  setRouteMap(routes, parentPath = '') {
    routes.forEach(route => {
      this.verifyRoute(route)

      this.routeMap.set(parentPath + route.path, route)
      this.routeMap.set(route.name, route)

      if (Array.isArray(route.children)) {
        this.setRouteMap(route.children, parentPath + route.path)
      }
    })
  }

  getComponent() {
    const route = this.routeMap.get(this.current)
    return route ? route.component : null
  }

  reactive() {
    // 响应式监听当前实例的 current 属性，当 url变化时 响应式渲染 对应的 组件
    Vue.util.defineReactive(this, 'current')
  }

  watchUrl() {
    window.addEventListener('load', () => this.onHashChange())
    window.addEventListener('hashchange', () => this.onHashChange())
  }

  onHashChange() {
    // 过滤掉 #
    this.current = window.location.hash.slice(1) || '/'
  }
}

export default VueRouter