<template>
  <div class="header">
    <div class="bar">
      <div class="wrap">
        <div class="bar-left">
          <span class="sign">请登录</span>
          <span class="register">免费注册</span>
        </div>
        <div class="bar-right">
          <ul>
            <li>我的乐享</li><i class="icon-thumb_down"></i>
            <li>帮助中心</li><i class="icon-minus-info"></i>
            <li>购物车</li><i class="icon-shopping_cart"></i>
          </ul>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="logo">
        <img src="/static/img/logo.png" alt="">
        <!-- <button @click="addOne">add one</button>
        <button @click="minusOne">minus one</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      // price: 5
    }
  },
  methods: {
    // addOne() {
    //   this.$store.commit('increment', this.price)
    // },
    // minusOne() {
    //   this.$store.commit('decrement', this.price)
    // }
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
      .bar-right
        ul
          display block
          li
            display inline-block
            margin-left 20px
          i:after
            vertical-align middle
            color #e76811
          .icon-thumb_down:after
            font-size 20px
          .icon-minus-info:after
            font-size 14px
            margin-left 3px
          .icon-shopping_cart:after
            font-size 15px
            margin-left 2px
  .wrap
    .logo
      img
        height 73px
</style>
