<template>
  <div class="hot-goods-box wrap">
    <h1 class="title">热推产品</h1>
    <ul class="hot-goods">
      <li v-for="(item, idx) in hotGoodsList">
        <div class="info">
          <h2>{{item.name}}</h2>
          <span class="price">￥{{item.price}}元</span>
          <span class="saleNum">月售: {{item.saleNum}}件</span>
        </div>
        <div class="img-box">
          <img :src="item.url" alt="">
        </div>
      </li>
    </ul>
    <ul class="theme-box" v-for="(themeItem, idx) in themeList">
      <li class="theme-name">
        <span>{{themeItem.theme.name}}</span>
        <img :src="themeItem.theme.url" alt="">
      </li>
      <li class="theme-img">
        <img :src="themeItem.themeImg" alt="">
      </li>
      <li class="themeGoods-list" v-for="(goods, idx) in themeItem.themeGoods">
        <span>{{goods.name}}</span>
        <img :src="goods.url" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hot-goods',
  data () {
    return {
      hotGoodsList: [{
        name: '姓名贴',
        price: 5.5,
        saleNum: 956,
        url: '/static/img/hotGoods-stiker.png'
      },{
        name: '自驾游',
        price: 86,
        saleNum: 956,
        url: '/static/img/hotGoods-travelling.png'
      },{
        name: '马克杯',
        price: 28,
        saleNum: 956,
        url: '/static/img/hotGoods-cup.png'
      },{
        name: '手机壳',
        price: 28,
        saleNum: 956,
        url: '/static/img/hotGoods-phoneShell.png'
      }],
      themeList: [{
        theme: {
          name: '爱的礼物',
          url: '/static/img/hotGoods-loveGift.png'
        },
        themeImg: '/static/img/hotGoods-center01.png',
        themeGoods: [{
          name: '相册摆件',
          url: '/static/img/hotGoods-album.png'
        },{
          name: '水晶摆件',
          url: '/static/img/hotGoods-decoration.png'
        },{
          name: '照片墙',
          url: '/static/img/hotGoods-yaoshikou.png'
        },{
          name: '迷你相册',
          url: '/static/img/hotGoods-pillow.png'
        },{
          name: '快乐生活',
          url: '/static/img/hotGoods-weddingAblum.png'
        },{
          name: '卡通杯',
          url: '/static/img/hotGoods-katongbei.png'
        }]
      },{
        theme: {
          name: '宝宝精品',
          url: '/static/img/hotGoods-loveGift.png'
        },
        themeImg: '/static/img/hotGoods-center02.png',
        themeGoods: [{
          name: '相册摆件',
          url: '/static/img/hotGoods-album.png'
        },{
          name: '水晶摆件',
          url: '/static/img/hotGoods-decoration.png'
        },{
          name: '照片墙',
          url: '/static/img/hotGoods-yaoshikou.png'
        },{
          name: '迷你相册',
          url: '/static/img/hotGoods-pillow.png'
        },{
          name: '快乐生活',
          url: '/static/img/hotGoods-weddingAblum.png'
        },{
          name: '卡通杯',
          url: '/static/img/hotGoods-katongbei.png'
        }]
      },{
        theme: {
          name: '纪念旅行',
          url: '/static/img/hotGoods-loveGift.png'
        },
        themeImg: '/static/img/hotGoods-center03.png',
        themeGoods: [{
          name: '相册摆件',
          url: '/static/img/hotGoods-album.png'
        },{
          name: '水晶摆件',
          url: '/static/img/hotGoods-decoration.png'
        },{
          name: '照片墙',
          url: '/static/img/hotGoods-yaoshikou.png'
        },{
          name: '迷你相册',
          url: '/static/img/hotGoods-pillow.png'
        },{
          name: '快乐生活',
          url: '/static/img/hotGoods-weddingAblum.png'
        },{
          name: '卡通杯',
          url: '/static/img/hotGoods-katongbei.png'
        }]
      }]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.hot-goods-box
  margin-top: 30px
  .title
    font-size 24px
    &:before
      content ''
      display inline-block
      width 5px
      height 24px
      background #e76811
      vertical-align bottom
      margin-right 10px
  .hot-goods
    margin-top 25px
    li
      width 250px
      height 350px
      vertical-align top
      margin-right 22px
      border 1px solid #ddd
      display inline-block
      padding 20px 15px
      &:last-child
        margin-right 0
      .info
        margin-bottom 80px
        h2
          font-size 20px
          margin-bottom 20px
        .price
          display inline-block
          width 125px
          height 30px
          line-height 30px
          background rgb(53, 167, 142)
          color #fff
          border-radius 4px
          text-align center
        .saleNum
          display inline-block
          width 120px
          text-align right
          color #aaa
      .img-box
        height 120px
        text-align center
        img
          width 220px
  .theme-box
    margin-top 40px
    display flex
    flex-wrap wrap
    justify-content space-between
    position relative
    li
      display inline-block
      background #f3f3f3
      vertical-align top
    .theme-name
      text-align center
      height 341px
      span
        display block
        width 288px
        margin 50px auto
        font-size 20px
      img
        width 135px
    .theme-img
      font-size 0
      img
        width 594px
    .themeGoods-list
      width 288px
      height 200px
      margin-top 20px
      position relative
      img
        height 160px
        position absolute
        right 0px
        top 38px
      span
        display block
        width 288px
        padding 20px
        font-size 18px
      &:nth-child(3)
        height 160px
        margin-top 0px
        display flex
        flex-direction row
        img
          top 0px
      &:nth-child(4)
        height 160px
        display block
        position absolute
        right 0px
        top 162px
        display flex
        flex-direction row
        img
          top 0px
</style>
