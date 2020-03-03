import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/index.vue'
import Rank from 'components/rank/index.vue'
import Search from 'components/search/index.vue'
import Singer from 'components/singer/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})
