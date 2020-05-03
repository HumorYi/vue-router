/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 23:40:31
 * @LastEditTime: 2020-05-03 00:16:00
 */
export default {
  // <router-link to="">xxx</router-link> => <a href="xxx">xxx</a>
  props: {
    to: {
      type: String | Object,
      required: true
    }
  },
  render(h) {
    // href => hash(#)、history(/，h5 history.popState pushState)
    return h('a',
      {
        attrs: { href: '#' + this.to }
      },
      [this.$slots.default]
    )
  }
}

