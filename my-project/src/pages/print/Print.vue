<template>
  <div class="print wrap">
    <div class="print-box" v-for="(sort, idx) in printList">
      <h1>{{sort.title}}</h1>
      <ul>
        <li v-for="(item, idx) in sort.itemList">
          <h1>{{item.title}}</h1>
          <p>{{item.msg}}</p>
          <img :src="item.url" alt="">
          <div>
            <router-link to="/detail" class="button">{{sort.btn}}</router-link>
          </div>
        </li>
      </ul>
      <i class="btn icon-prev"></i>
      <i class="btn icon-next"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'print',
  data () {
    return {
      printList: [{
        title: '冲印照片',
        itemList: [{
          title: '冲印照片',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printPto01.png'
        },{
          title: '护照证件照',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printPto01.png'
        },{
          title: '影楼艺术照',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printPto01.png'
        }],
        btn: '立即冲印'
      },{
        title: '喝水杯',
        itemList: [{
          title: '白色马克杯',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printCup01.png'
        },{
          title: '彩色马克杯',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printCup02.png'
        },{
          title: '定制马克杯',
          msg: '留住您最美好的回忆！',
          url: '/static/img/printCup01.png'
        }],
        btn: '开始制作'
      },{
        title: 'T恤',
        itemList: [{
          title: '儿童款',
          msg: '留住您最美好的回忆！',
          url: '/static/img/T-shirt01.png'
        },{
          title: '情侣款',
          msg: '留住您最美好的回忆！',
          url: '/static/img/T-shirt02.png'
        },{
          title: '亲子款',
          msg: '留住您最美好的回忆！',
          url: '/static/img/T-shirt01.png'
        }],
        btn: '开始制作'
      }]
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
@import "../../common/stylus/mixin.styl"

.print-box
  position relative
  >h1
    text-align center
    font-size 28px
    position relative
    margin 50px auto
    &:after
      content ''
      display inline-block
      width 24px
      height 3px
      background #e76811
      position absolute
      bottom -15px
      left 50%
      margin-left -12px
  ul
    text-align center
    white-space nowrap
    width 1003px
    overflow hidden
    margin 0 auto
    li
      vertical-align top
      width 500px
      height 450px
      display inline-block
      border 1px solid #ccc
      border-right none
      text-align center
      &:last-child
        border-right 1px solid #ccc
      >h1
        margin 25px auto 12px
        font-size 18px
        color #666
      >p
        color #aaa
        font-size 14px
        margin-bottom 25px
      >img
        height 250px
      >div
        .button
          display inline-block
          width 130px
          height 40px
          line-height 40px
          margin 30px
          background rgb(53, 167, 142)
          border 1px solid rgb(53, 167, 142)
          border-radius 4px
          color #fff
          font-size 16px
          cursor pointer
          &:hover
            background rgb(43, 157, 132)
  .btn
    btn(#fff)
</style>
