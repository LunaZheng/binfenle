<template>
  <div class="index">
    <div class="notice-box wrap">
      <div class="notice">
        <i class="icon-thumb_horn"></i><span>公告栏</span>
        <span class="notice-text">
          <a href="javascript:">春节放假通知</a>
        </span>
      </div>
      <div class="close">
        <i class="icon-close"></i>
      </div>
    </div>
    <div class="series-box wrap">
      <div class="series-item" v-for="(item, idx) in seriesList">
        <div class="info">
          <h1>{{item.name + '系列'}}</h1>
          <a href="javasctipt:">点击进入 &gt; </a>
          <h2>{{item.msg}}</h2>
        </div>
        <div class="img-box">
          <img :src="item.url" alt="">
        </div>
      </div>
    </div>
    <div class="DIY-box wrap">
      <h1>DIY定制过程</h1>
      <ul>
        <li v-for="(item, idx) in DIYList">
          <img :src="item.icon" alt="">
          <h2>{{item.text}}</h2>
        </li>
      </ul>
    </div>
    <hot-goods></hot-goods>
  </div>
</template>

<script>
import hotGoods from '../../components/hotGoods.vue'

export default {
  name: 'index',
  created() {
    var vm = this
    // vm.$axios.post('/api/getOrderList', {id: 1})
    vm.$axios.post('/api/getNewsList')
    .then((res) => {
      console.log(res.data)
    }, (err) => {
      console.log(err)
    })
  },
  data () {
    return {
      seriesList: [{
        name: '照片',
        url: '/static/img/photoSeries.png',
        msg: '让照片做成书,翻阅成为你的习惯'
      },{
        name: '冲印照片',
        url: '/static/img/printSeries.png',
        msg: '让照片做成书,翻阅成为你的习惯'
      },{
        name: '台历挂历',
        url: '/static/img/calendarSeries.png',
        msg: '让照片做成书,翻阅成为你的习惯'
      },{
        name: '创意生活',
        url: '/static/img/creativeSeries.png',
        msg: '让照片做成书,翻阅成为你的习惯'
      },{
        name: '影楼册',
        url: '/static/img/studioSeries.png',
        msg: '让照片做成书,翻阅成为你的习惯'
      }],
      DIYList: [{
        icon: '/static/img/temp.svg',
        text: '选择模板'
      },{
        icon: '/static/img/design.svg',
        text: 'DIY设计'
      },{
        icon: '/static/img/order.svg',
        text: '确认下单'
      },{
        icon: '/static/img/send.svg',
        text: '生产发货'
      }]
    }
  },
  components: {
    hotGoods
  },
  methods: {

  },
  mounted() {
    var vm = this
    window.addEventListener('hashchange', (e) => {
      if(e.newURL.slice(-2) === '/0') {
        console.log('asdfg')
      }
    }, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.notice-box
  height 40px
  line-height 40px
  display flex
  justify-content space-between
  background rgba(220,220,220,0.2)
  margin-bottom: 30px
  > div
    margin 0 15px
    &.notice
      color rgb(246,96,9)
      font-size 16px
      i
        margin-right: 10px
        font-size 20px
        vertical-align middle
      .notice-text
        padding-left 50px
    &.close
      color #aaa
      font-size 24px
      vertical-align middle
.series-box
  display flex
  flex-direction row
  .series-item
    width 220px
    height 250px
    display inline-block
    margin-right 25px
    background-color #f3f3f3
    vertical-align top
    text-align center
    &:last-child
      margin-right 0
    &:nth-child(2n+1)
      display flex
      flex-direction column-reverse
    .info
      text-align left 
      margin 20px 0 30px
      a
        display inline-block
        padding 8px 20px
        margin 5px 0
        background #fff
        color rgb(53, 167, 142)
        font-size 15px
      h2
        color #aaa
        font-size 12px
    .img-box
      height 120px
      display flex
      align-items center
      justify-content center
      img
        width 140px
.DIY-box
  background rgba(220,220,220,0.2)
  margin-top: 30px
  h1
    width 270px
    height 70px
    line-height 70px
    display inline-block
    background rgba(220,220,220,0.2)
    vertical-align top
    text-align center
    color rgb(53, 167, 142)
    font-size 20px
  ul
    display inline-block
    li
      display inline-block
      margin 0 80px
      text-align center
      margin-top 10px
      color rgb(53, 167, 142)
</style>
