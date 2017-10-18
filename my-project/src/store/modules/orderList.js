import Vue from 'vue'

const state = { // state 存放数据
  totalPrice: 0
}

const getters = {
  // orderList(state) {
  //   return state.orderList
  // }
  getOrderList: state => state.totalPrice
}

const actions = { // actions异步操作,不允许直接对state进行更改
  fetchOrderList({commit, state}) { // commit调用mutation, state获取状态集里的数据的
    Vue.http.post('/api/getOrderList', state.params)
    .then((res) => {
      commit('updateOrderList', res.data.list) // 调用mutations里的updateOrderList,传值
    }, (err) => {

    })
  }
}

const mutations = { // mutations同步操作, 允许对state进行更改
  updateOrderList(state, payload) {
    state.orderList = payload
  },
  increment (state, price) {
    state.totalPrice += price
  },
  decrement (state, price) {
    state.totalPrice -= price
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}