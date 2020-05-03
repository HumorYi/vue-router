<!--
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2020-05-02 17:15:48
 * @LastEditTime: 2020-05-03 15:36:00
-->
<template>
  <div id="app">
    <router-link v-for="(item, index) in routerLinks" :key="index" :to="item.path">{{item.name}}</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      routerLinks: [
        {
          path: '/',
          name: 'home'
        },
        {
          path: '/news',
          name: 'home/news'
        },
        {
          path: '/news/detail',
          name: 'home/news/detail'
        },
        {
          path: '/about',
          name: 'about'
        },
      ]
    }
  },
}
</script>

<style>
a {
  margin-left: 10px;
}
</style>
