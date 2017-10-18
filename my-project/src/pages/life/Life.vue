<template>
  <div class="life">
    <ul class="wrap">
      <li v-for="(item, idx) in lifeList">
        <div class="img-box">
          <img :src="item.url" alt="">
        </div>
        <h1>{{item.title}}</h1>
        <p>{{item.msg}}{{item.title}}</p>
        <div class="btn">
          <span class="price">￥{{item.price}}元</span>
          <button>开始制作</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'life',
  data () {
    return {
      lifeList: [{
        url: "/static/img/life-ysk.png",
        title: '钥匙扣',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-xitie.png",
        title: '喜帖',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-notebook.png",
        title: '笔记本',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-mousepad.png",
        title: '鼠标垫',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-calendar.png",
        title: '年历',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-poster.png",
        title: '海报',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-pillow.png",
        title: '抱枕',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-sticker.png",
        title: '贴纸',
        msg: '做出自己独特的',
        price: '28.8'
      },{
        url: "/static/img/life-mirror.png",
        title: '化妆镜',
        msg: '做出自己独特的',
        price: '28.8'
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
.life
  ul
    text-align center
    li
      width 333px
      height 333px
      display inline-block
      margin 50px auto
      margin-right 100px
      &:nth-child(3)
      &:nth-child(6)
      &:nth-child(9)
        margin-right 0px
      .img-box
        width 310px
        height 310px
        display inline-block
        text-align center
        border 1px solid #eee
        box-shadow 0 0 0 8px rgba(0, 0, 0, .03)
        margin 0
        img
          height 300px
      h1
        font-size 20px
        margin 20px auto 15px
        padding 10px 0
        border-top 1px solid rgb(53, 167, 142)
        border-bottom 1px solid rgb(53, 167, 142)
        color rgb(53, 167, 142)
      p
        color #999
        font-size 14px
        margin 15px
      .btn
        background rgb(53, 167, 142)
        padding 6px
        color #fff
        font-size 24px
        span
          margin-right 40px
        button
          vertical-align middle
          background rgb(53, 167, 142)
          border 1px solid #fff
          border-radius 4px
          color #fff
          font-size 16px
          padding 5px 20px
          cursor pointer
          &:hover
            background rgb(43, 157, 132)
</style>
