<template>
  <div class="nav-box" :style="{'background-image': !isShowSortLis ? '' : 'url('+path+'/static/img/home-focus0'+ (isOn*1 + 1) + '.png'}">
    <div class="nav-bar">
      <div class="wrap">
        <span @click="isShowSortLis = !isShowSortLis">全部商品分类<i class="icon-triangle-down" v-show="!isShowSortLis"></i></span>
        <ul class="nav">
          <li v-for="(item, idx) in navList">
            <router-link 
              :to="'/' + idx"
              :class="{'on': (idx == isOn) && !isToGoodsLeft}"
            ><span @click="changeBg(idx, $event)">{{item}}</span></router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <ul class="sort-list" v-show="isShowSortLis">
        <li class="sort-item"
          v-for="(item, idx) in sortList"
          @click="gotoGoodsList"
          :class="{'on': item === $route.params.sort}"
        >
          <router-link
            :to="'/' + isOn + '/goodsList/' + item"
          >{{item}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      path: '',
      isShowSortLis: true,
      isOn: "",
      isToGoodsLeft: false,
      navList: ['首页', '个性印刷', '创意生活'],
      sortList: ['台历', '挂历','照片书', '影楼册', '3D数码周边', '字母银饰', '冲印照片', '喝水杯', 'T恤', '创意生活']
    }
  },
  watch: {
    isShowSortLis(newVal) {
      if(!newVal) {
        document.getElementsByClassName('nav-box')[0].style.background = ''
      }
    }
  },
  methods: {
    changeBg(idx, e) {
      document.getElementsByClassName('nav-bar')[0].style.background = ''
      var urlIdx = (idx + 1)%10 != 0 ? "0" + (idx + 1) * 1 : + idx+1
      $(e.target.closest('a')).siblings().removeClass('on')
      $(e.target.closest('a')).addClass('on')
      $(e.target.closest('.nav-box')).css({
        'height': '437px',
        'background-image': 'url("'+this.path+'/static/img/home-focus' + urlIdx + '.png")'
      })
    },
    gotoGoodsList() {
      var vm = this
      vm.isShowSortLis = false
      vm.isToGoodsLeft = true
      if(location.hash.indexOf('goodsList') > -1 || location.hash.indexOf('edit') > -1) {
        vm.isToGoodsLeft = true
        document.getElementsByClassName('nav-box')[0].style.height = '42px'
        document.getElementsByClassName('nav-bar')[0].style.background = 'rgb(53, 167, 142)'
        document.getElementsByClassName('nav')[0].childNodes.forEach(function(item, idx) {
          item.childNodes[0].style.color = "#fff"
        })
      } else {
        vm.isToGoodsLeft = false
      }
    }
  },
  mounted() {
    var vm = this
    vm.path = location.origin
    if(location.hash.substring(2)==='0') {
      vm.isShowSortLis = true
      vm.isOn = 0
    } else {
      vm.isShowSortLis = false
      vm.isOn = location.hash.substring(2, 3)
    }
    window.addEventListener('hashchange', () => {
      if(location.hash.substring(2)==='0') {
        vm.isShowSortLis = true
        vm.isOn = 0
      } else {
        vm.isShowSortLis = false
        vm.isOn = location.hash.substring(2, 3)
      }
    }, false)
    location.hash.indexOf('goodsList') > -1 ? vm.isToGoodsLeft = true : vm.isToGoodsLeft = false
    if(vm.isToGoodsLeft) {
      vm.gotoGoodsList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.nav-box
  width 1531px
  height 437px
  background #eee url('/static/img/home-focus01.png') center/contain no-repeat
  .nav-bar
    height 42px
    background rgba(255,255,255,0.5)
    >.wrap
      display flex
      justify-content space-between
      >span
        height 42px
        color #fff
        font-size 18px
        display inline-block
        width 240px
        text-align center
        line-height 42px
        background rgb(53, 167, 142)
        .icon-triangle-down
          font-size 30px
          vertical-align middl
          position absolute
          margin-top 5px
          margin-left 10px
          color rgba(255, 255, 255, .5)
      .nav
        li
          display inline-block
          margin 10px 17px 10px 76px
          a
            &.on
            &:hover
              color #e76811
  .sort-list
    width 240px
    .sort-item
      width 240px
      height 40px
      line-height 40px
      text-align center
      background #fff
      cursor pointer
      position relative
      z-index 10
      a
        display inline-block
        width 100%
      &:hover a
      &.on a
        color rgb(53, 167, 142)
</style>
