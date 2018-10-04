/* es6 编译 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
/* 300mms延迟 */
import fastClick from 'fastclick'

import 'common/stylus/index.styl'

fastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
