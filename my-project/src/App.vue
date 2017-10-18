<template>
  <div id="app">
    <v-header></v-header>
    <div class="content">
      <span>{{totalPrice}}</span>
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
