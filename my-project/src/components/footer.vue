<template>
  <div class="footer">
    <slot name="medal">
      <div class="medal">
        <div class="wrap">
          <img src="/static/img/footer.png" alt="">
        </div>
      </div>
    </slot>
    <div class="main">
      <span>关于我们</span>
      <span>商家合作</span>
      <span>合作咨询</span>
      <span>使用协议</span>
      <span>诚聘英才</span>
      <span>网站地图</span>
      <span>帮助中心</span>
    </div>
    <p class="wrap">沪ICP备08116442号 Copyright © 2009-2016 缤纷乐版权所有 </p>
  </div>
</template>

<script>
export default {
  name: 'footer'
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer
  margin-top 50px
  background #f9f8fd
  .medal
    padding 25px
    text-align center
    border-bottom 1px solid #ccc
    img
      width 850px
  .main
    display flex
    justify-content center
    span
      display inline-block
      color #999
      font-size 14px
      margin 15px 20px 10px 0px
      padding-right 15px
      border-right 1px solid #ccc
      &:last-child
        border-right none
  p
    text-align center
    color #999
    font-size 12px
    padding 10px
</style>
