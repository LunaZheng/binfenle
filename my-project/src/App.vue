<template>
  <div id="app">
    <v-header :g="g">
      <div slot="bar-left" class="isEditPage" v-if="g.login.username && g.login.isEditPage">
        <router-link to="/0"><img src="/static/img/logo.png" alt="" class="bar-left-logo"></router-link>
      </div>
      <div slot="bar-left" class="isLogin" v-if="g.login.username && (!g.login.isEditPage)">{{g.login.username}}</div>
      <div slot="logo-box" v-if="g.login.username && g.login.isEditPage"></div>
    </v-header>

    <div class="content">
      <!-- <span>{{$store.getters.getOrderList}}</span> -->
      <!-- <span>{{totalPrice}}</span> -->
      <v-nav v-if="!isShowNav"></v-nav>
      <router-view></router-view>
    </div>
    <v-footer v-if="!(g.login.username && g.login.isEditPage)">
      <div slot="medal" v-if="(!g.login.username && (g.isLoginPage || g.isRegisterPage))"></div>
    </v-footer>
  </div>
</template>

<script>
import header from './components/header.vue'
import footer from './components/footer.vue'
import nav from './components/nav.vue'

export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-nav': nav
  },
  computed: {
    // store
    totalPrice() {
      return this.$store.getters.getOrderList
    },
    isShowNav() {
      var g = this.g
      return (g.login.username && g.login.isEditPage) || (!g.login.username && (g.isLoginPage || g.isRegisterPage))
    }
  },
  data() {
    return {
      g: {
        login: {
          // username: '世界那么大，欢迎您！',
          username: '',
          isEditPage: false
        },
        isLoginPage: false,
        isRegisterPage: false
      }
    }
  },
  mounted() {
    var vm = this
    if(location.hash.indexOf('detail') > -1) {
      // login
      vm.g.login.username = '世界那么大，欢迎您！'
      document.getElementsByClassName('nav-box')[0].style.height = '42px'
      document.getElementsByClassName('nav-bar')[0].style.background = 'rgb(53, 167, 142)'
      document.getElementsByClassName('nav')[0].childNodes.forEach(function(item, idx) {
        item.childNodes[0].style.color = "#fff"
      })
    }
    window.addEventListener('hashchange', (e) => {
      if(e.newURL.indexOf('detail') > -1) {
        // login
        vm.g.login.username = '世界那么大，欢迎您！'
        document.getElementsByClassName('nav-box')[0].style.height = '42px'
        document.getElementsByClassName('nav-bar')[0].style.background = 'rgb(53, 167, 142)'
        document.getElementsByClassName('nav')[0].childNodes.forEach(function(item, idx) {
          item.childNodes[0].style.color = "#fff"
        })
      }
    }, false)
    if(location.hash.indexOf('edit') > -1) {
      vm.g.login.username = '世界那么大，欢迎您！'
      vm.g.login.isEditPage = true
    }
    window.addEventListener('hashchange', (e) => {
      if(e.newURL.indexOf('edit') > -1) {
        vm.g.login.username = '世界那么大，欢迎您！'
        vm.g.login.isEditPage = true
      }
    }, false)
    window.addEventListener('hashchange', (e) => {
      if(e.newURL.slice(-2) === '/0') {
        vm.g.login.isEditPage = false
      }
    }, false)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.isEditPage
  .bar-left-logo 
    height 25px
.isLogin
  color #666
</style>
