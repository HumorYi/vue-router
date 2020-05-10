/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 17:21:20
 * @LastEditTime: 2020-05-10 18:39:17
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
    this.routeMap = new Map()

    this.setCurrent()

    this.setRouteMap(this.$options.routes)

    // 响应式监听当前实例的 matched 属性，当 url变化时 响应式渲染 对应的 组件
    Vue.util.defineReactive(this, 'matched', [])

    this.match()

    this.watchUrl()
  }

  static install(_Vue) {
    Vue = _Vue

    VueRouter.mixin()
    VueRouter.createComponent()
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

  static createComponent() {
    Vue.component('router-link', link)
    Vue.component('router-view', view)
  }

  match(routes) {
    routes = routes || this.$options.routes

    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }

      // route.path => /info    this.current => /about/info
      if (route.path !== '/' && this.current.includes(route.path)) {
        this.matched.push(route)

        if (route.children && route.children.length > 0) {
          this.match(route.children)
        }

        return
      }
    }
  }

  verifyRoute(path, name) {
    if (this.routeMap.get(path)) {
      throw new Error('路由path：' + path + ' 已存在')
    }

    if (this.routeMap.get(name)) {
      throw new Error('路由name：' + name + ' 已存在')
    }
  }

  setRouteMap(routes, parentPath = '') {
    routes.forEach(route => {
      const path = parentPath + route.path
      const name = route.name

      this.verifyRoute(path, name)

      this.routeMap.set(path, route)
      this.routeMap.set(name, route)

      if (Array.isArray(route.children)) {
        this.setRouteMap(route.children, path)
      }
    })
  }

  getComponent(depth) {
    // const route = this.routeMap.get(this.current)
    const route = this.matched[depth]
    return route ? route.component : null
  }

  watchUrl() {
    window.addEventListener('load', () => this.onHashChange())
    window.addEventListener('hashchange', () => this.onHashChange())
  }

  onHashChange() {
    this.setCurrent()
    this.matched = []
    this.match()
  }

  setCurrent() {
    // 过滤掉 #
    this.current = window.location.hash.slice(1) || '/'
  }
}

export default VueRouter
