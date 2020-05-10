/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 23:41:50
 * @LastEditTime: 2020-05-10 18:22:41
 */
export default {
  // <router-view></router-view>
  render(h) {
    // 使用 虚拟 dom 的 data，标记当前 routerView 深度
    this.$vnode.data.routerView = true

    let depth = 0
    let parent = this.$parent

    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data

      // parent 是一个 routerView
      if (vnodeData && vnodeData.routerView) {
        depth++
      }

      parent = parent.$parent
    }

    return h(this.$router.getComponent(depth))
  }
}
