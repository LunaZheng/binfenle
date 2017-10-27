<template>
  <div class="header">
    <div class="bar" v-if="isShowBar">
      <div class="wrap">
        <slot name="bar-left">
          <div class="bar-left">
            <span class="sign">请登录</span>
            <span class="register">免费注册</span>
          </div>
        </slot>
        <slot name="bar-right" class="bar-right">
          <bar-right :g="g"></bar-right>
        </slot>
      </div>
    </div>
    <div class="wrap">
      <slot name="logo-box">
        <div class="logo-box" :class="{'isHeighter': !g.login.username && (g.isLoginPage || g.isRegisterPage)}">
          <router-link to="/0"><img src="/static/img/logo.png" alt=""></router-link>
          <!-- <button @click="addOne">add one</button>
          <button @click="minusOne">minus one</button> -->
          <div class="logo-box-right" v-if="!isShowBar">
            <bar-right :g="g"></bar-right>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import barRight from './bar-right.vue'

export default {
  name: 'header',
  props: ['g'],
  components: {
    barRight
  },
  data() {
    return {
      
    }
  },
  computed: {
    isShowBar() {
      var g = this.g
      return g.login.username || !(g.isLoginPage || g.isRegisterPage)
    }
  },
  methods: {

  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../common/stylus/mixin.styl"

.header
  .bar 
    color #333
    height 25px
    line-height 25px
    background #eee
    font-size 12px
    border-1px(#ddd)
    .wrap:first-child
      display flex
      justify-content space-between
      .bar-left
        span
          margin-right 20px
          &.register
            padding 3px 5px
            color rgb(53, 167, 142)
            border 1px solid rgb(53, 167, 142)
            border-radius 4px
  .wrap
    .logo-box
      img
        height 73px
    .isHeighter
      height 85px
    .logo-box-right
      float right
</style>
