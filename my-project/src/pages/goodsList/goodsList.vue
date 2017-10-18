<template>
  <div class="goodsList wrap">
    <div class="list-box" v-for="(sort, idx) in goodsList" v-if="sort.sort === $route.params.sort">
      <ul class="sort-bar">
        <li v-for="(detail, idx) in sort.detailList" @click="changeCurDetail(detail.detail, $event)">
          <a href="javascript:">{{detail.detail}}</a>
        </li>
      </ul>
      <ul class="detail-list" v-for="(detail, idx) in sort.detailList" v-if="detail.detail === curDetail || isShowAll">
        <li v-for="(item, idx) in detail.list">
          <img :src="item.url" alt="">
          <div class="sale-box">
            <span class="price">￥{{item.price}}元</span>
            <span class="num">销量: {{item.saleNum}}</span>
          </div>
          <p class="info">{{item.info}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  data () {
    return {
      curDetail: '热门台历',
      isShowAll: false,
      goodsList: [{
        sort: '台历',
        detailList: [{
          detail: '热门台历',
          list: [{
            url: '/static/img/hotCalendar (1).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (2).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (3).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (4).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (5).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (6).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (7).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (8).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (9).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (11).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (12).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (13).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (14).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (15).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (16).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          }]
        },{
          detail: '时光台历',
          list: [{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          },{
            url: '/static/img/hotCalendar (10).png',
            price: 28.8,
            saleNum: 586,
            info: '6寸4D-200张家庭宝宝儿童相册'
          }]
        },{
          detail: '插卡台历',
          list: []
        },{
          detail: '小巧台历',
          list: []
        },{
          detail: '宝宝台历',
          list: []
        },{
          detail: '亚克力台历',
          list: []
        },{
          detail: '全部',
          list: []
        }]
      },{
        sort: '挂历',
        detailList: [{
          detail: '热门挂历',
          list: []
        },{
          detail: '时光挂历',
          list: []
        },{
          detail: '插卡挂历',
          list: []
        },{
          detail: '小巧挂历',
          list: []
        },{
          detail: '宝宝挂历',
          list: []
        },{
          detail: '亚克力挂历',
          list: []
        },{
          detail: '全部',
          list: []
        }]
      },{
        sort: '照片书',
        detailList: [{
          detail: '',
          list: []
        },{
          detail: '',
          list: []
        },{
          detail: '',
          list: []
        },{
          detail: '',
          list: []
        }]
      },{
        sort: '影楼册',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: '3D数码周边',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: '字母银饰',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: '冲印照片',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: '喝水杯',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: 'T恤',
        detailList: [{
          detail: '',
          list: []
        }]
      },{
        sort: '创意生活',
        detailList: [{
          detail: '',
          list: []
        }]
      }]
    }
  },
  methods: {
    changeCurDetail(cur, e) {
      var vm = this
      vm.curDetail = cur
      vm.isShowAll = (cur === '全部' ? true : false)
      $(e.target.closest('li')).siblings().removeClass('on')
      $(e.target.closest('li')).addClass('on')
    }
  },
  mounted() {
    var vm = this
    if(location.hash.indexOf('goodsList') > -1) {
      setTimeout(function() {
        document.querySelector('.sort-bar li').className = 'on'
      }, 30)
      window.addEventListener('hashchange', (e) => {
        if(e.newURL.indexOf('goodsList') > -1) {
          document.querySelector('.sort-bar li').className = 'on'
        }
      }, false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.goodsList
  .list-box
    .sort-bar
      border-bottom 2px solid rgb(53, 167, 142)
      margin 50px auto
      li
        height 40px
        line-height 40px
        text-align center
        display inline-block
        a
          padding 0 25px
          border-right 1px solid #eee
          color #666
        &:hover
        &.on
          background rgb(53, 167, 142)
          a
            border-right 1px solid transparent
            color #fff
        &:last-child
          a
            border-right 1px solid transparent
    .detail-list
      li
        width 260px
        text-align center
        display inline-block
        border 1px solid #eee
        margin-right 24px
        margin-bottom 24px
        padding 20px 10px 35px
        &:nth-child(4n)
          margin-right 0
        img
          height 200px
        .sale-box
          padding 0px 10px 15px 10px
          display flex
          justify-content space-between
          .price
            color #e76811
          .num
            color #aaa
        .info
          color #888
          text-align left
</style>
