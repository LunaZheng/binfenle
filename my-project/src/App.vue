<template>
  <div id="app">
    <v-header :g="g">
      <div slot="bar-left" class="isEditPage" v-if="g.login.username && g.login.isEditPage">
        <img src="/static/img/logo.png" alt="" class="bar-left-logo">
      </div>
      <div slot="bar-left" class="isLogin" v-if="g.login.username && (!g.login.isEditPage)">{{g.login.username}}</div>
    </v-header>

    <div class="content">
      <!-- <span>{{totalPrice}}</span> -->
      <v-nav></v-nav>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
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
    totalPrice() {
      return this.$store.getters.getOrderList
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
