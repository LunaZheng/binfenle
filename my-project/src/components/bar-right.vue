<template>
  <div class="bar-right">
    <ul v-if="isShowUser" :class="{'isEditPage': isShowUser}">
      <!-- 待解决 001:  小竖线的优化及收藏 -->
      <li v-if="g.login.isEditPage">
        <a href="javascript:">{{g.login.username}}</a>
      </li>
      <li v-if="g.login.isEditPage">
        <a href="javascript:">退出</a>
      </li>
      <li>
        <a href="javascript:" class="noLine">帮助中心
          <i class="icon-minus-info"></i>
        </a>
      </li>
    </ul>
    <ul v-if="!isShowUser">
      <li>
        <a href="">我的乐享
          <i class="icon-thumb_down"></i>
        </a>
      </li>
      <li>
        <a href="javascript:">帮助中心
          <i class="icon-minus-info"></i>
        </a>
      </li>
      <li>
        <a href="javascript:">购物车
          <i class="icon-shopping_cart"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bar-right',
  props: ['g'], 
  computed: {
    isShowUser() {
      var g = this.g
      return g.login.username && g.login.isEditPage
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

.bar-right
  font-size 12px
  ul
    display block
    li
      display inline-block
      a
        padding 10px
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
    &.isEditPage
      li
        a
          padding 0 22px
          border-right 1px solid #999
          &.noLine
            border-right 1px solid transparent
</style>
