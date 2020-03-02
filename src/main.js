/* es6 编译 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'


/* 300mms延迟 */
import fastClick from 'fastclick'

/* 图片懒加载 */ 
// import VueLazyload from 'vue-lazyload'

/* 样式文件 */ 
// import 'common/stylus/index.styl'

/* 300mms延迟 */
fastClick.attach(document.body)
// Vue.use(VueLazyload, {
//   loading: require('common/image/default.png')
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
