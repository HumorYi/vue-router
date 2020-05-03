/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 23:41:50
 * @LastEditTime: 2020-05-03 00:15:49
 */
export default {
  // <router-view></router-view>
  render(h) {
    return h(this.$router.getComponent())
  }
}