import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index.vue'
import Print from '@/pages/print/Print.vue'
import Life from '@/pages/life/Life.vue'
import goodsList from '@/pages/goodsList/goodsList.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/0',
    name: 'Index',
    component: Index
  },{
    path: '/1',
    name: 'Print',
    component: Print
  },{
    path: '/2',
    name: 'Life',
    component: Life
  },{
    path: '/',
    redirect: '/0'
  },{
    path: '/*/goodsList/:sort',
    component: goodsList
  }]
})
