// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fabric from 'fabric'
import $ from 'jquery'

import axios from 'axios'
/*var qs = require('qs')
var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
})*/
Vue.prototype.$axios = axios

Vue.config.productionTip = false

import './common/stylus/index.styl'

// let store = new Vuex.Store({
//   state: {
//     totalPrice: 0
//   },
//   getters: {
//     getTotal(state) {
//       return state.totalPrice
//     }
//   },
//   mutations: { // 同步
//     increment(state, price) {
//       state.totalPrice += price
//     },
//     decrement(state, price) {
//       state.totalPrice -= price
//     },
//     actions: {
//       increase(context, id) {  // 只能<异步>调用mutations里的方法
//         api(id, function(price) { // 发送http请求
//           context.commit('increment', price)
//         })
//       }
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
