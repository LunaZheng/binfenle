<template>
  <div class="edit">
    <ul class="edit-list">
      <li class="edit-list-item" 
        v-for="(item, idx) in editList" 
        @mouseenter="hoverIn(idx)" 
        @mouseleave="hoverOut(idx)"
        @click="showList(idx, $event)"
        :class="{'on': idx ===curShowListIdx}" 
      >
        <img :src="(idx === curChangeIconIdx || idx === curShowListIdx) ? ('/static/img/edit/' + item.name + '-hover.svg') : ('/static/img/edit/' + item.name + '.svg')" alt="" class="edit-list-icon">
        <span>{{item.name}}</span>
        <i class="icon-more"></i>
          <ul :class="'edit-' + item.tag + '-list item-list'" v-if="idx === curShowListIdx" :style="{'top': 42 * (idx + 1) + 'px'}" @click="stopParentEvent">
            <li v-for="(v, i) in item.item">
              <img :src="v.img" alt="" :class="{'on': i === 0}" :title="v.title" @click="editListClick(item.name, i, $event)">
              <h1 v-if="item.name === '模板'">{{v.tag}}</h1>
            </li>
          </ul>
      </li>
      <a href="javascript:;" class="file">添加照片
        <input type="file" name="" id="fileEL" multiple="" @change="selectPic">
      </a>
    </ul>
    <div class="edit-content">
      <div class="edit-top-bor">
        <ul class="edit-left">
          <li>
            <a href="javascript:"><i class="icon-undo"></i>撤销</a>
          </li>
          <li>
            <a href="javascript:"><i class="icon-redo"></i>恢复</a>
          </li>
          <li>
            <a href="javascript:"><i class="icon-eye"></i>预览</a>
          </li>
        </ul>
        <ul class="edit-right">
          <li>
            <a href="javascript:"><i class="icon-cion"></i>了解价格</a>
          </li>
          <li>
            <a href="javascript:"><i class="icon-save"></i>保存</a>
          </li>
          <li>
            <a href="javascript:"><i class="icon-shopping_cart"></i>加入购物车</a>
          </li>
        </ul>
      </div>
      <div class="canvas-box">
        <canvas id="canvasOut"></canvas>
      </div>
      <div class="edit-bottom">
        <div class="btn-box">
          <div class="btn-left">
            <a class="pic-btn" :class="{'on': !isShowPage}" @click="isShowPage = !isShowPage">照片</a>
            <a class="page-btn" :class="{'on': isShowPage}" @click="isShowPage = !isShowPage">页面</a>
            <span class="totalPage">共计 {{isShowPage ? filePageData.length : filePicData.length}} 张{{isShowPage ? '页面' : '图片'}}</span>
          </div>
          <div class="btn-right">
            <a href="javascript:"><img src="/static/img/edit/删除模板.svg" alt="">删除模板</a>
            <a href="javascript:"><img src="/static/img/edit/整本填充.svg" alt="">整本填充</a>
            <a href="javascript:"><img src="/static/img/edit/单页填充.svg" alt="">单页填充</a>
            <a href="javascript:"><img src="/static/img/edit/添加照片.svg" alt="">添加照片</a>
            <a href="javascript:"><img src="/static/img/edit/删除照片.svg" alt="">删除照片</a>
            <a href="javascript:"><input type="checkbox">隐藏已用照片</a>
          </div>
        </div>
        <div class="btn-list">
          
        </div>
        <div class="pic-box">
          <i class="btn icon-prev"></i>
          <i class="btn icon-next"></i>
          <div class="img-list">
            <ul id="ul1">
              <li v-if="!isShowPage" v-for="(img, idx) in filePicData">
                <img height="78" :src="img.src" alt="" :clsaa="'img' + idx" :title="img.name" draggable="true" ondragstart="drag(event)"/>
                <h1 :title="img.name">{{idx + 1}}页 {{img.name}}</h1>
              </li>
              <li v-if="isShowPage" v-for="(page, idx) in filePageData">
                <img height="78" :src="page.src" alt="" :clsaa="'page' + idx" :title="page.name" draggable="true" ondragstart="drag(event)"/>
                <h1 :title="page.name">{{idx + 1}}页</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      curShowListIdx: -1,
      curChangeIconIdx: -1,
      filePicData: [],
      curBgImg: '/static/img/edit/bg.png',
      filePageData: [{
        src: '/static/img/edit/page-01.png',
        name: '多彩泡泡111'
      },{
        src: '/static/img/edit/page-02.png',
        name: '多彩泡泡222'
      },{
        src: '/static/img/edit/page-03.png',
        name: '多彩泡泡333'
      },{
        src: '/static/img/edit/page-04.png',
        name: '多彩泡泡444'
      },{
        src: '/static/img/edit/page-05.png',
        name: '多彩泡泡555'
      },{
        src: '/static/img/edit/page-06.png',
        name: '多彩泡泡666'
      },{
        src: '/static/img/edit/page-07.png',
        name: '多彩泡泡777'
      },{
        src: '/static/img/edit/page-08.png',
        name: '多彩泡泡888'
      },{
        src: '/static/img/edit/page-01.png',
        name: '多彩泡泡111'
      },{
        src: '/static/img/edit/page-02.png',
        name: '多彩泡泡222'
      }],
      isShowPage: false,
      editList: [{
        tag: 'template',
        name: '模板',
        item: [{
          img: '/static/img/edit/temp01.png',
          tag: '封面'
        },{
          img: '/static/img/edit/temp02.png',
          tag: '1页'
        },{
          img: '/static/img/edit/temp03.png',
          tag: '2页'
        },{
          img: '/static/img/edit/temp02.png',
          tag: '3页'
        },{
          img: '/static/img/edit/temp03.png',
          tag: '4页'
        }]
      },{
        tag: 'font',
        name: '文字',
        item: [{
          img: '/static/img/edit/font01.png',
          title: 'STXingkai 华文行楷'
        },{
          img: '/static/img/edit/font02.png',
          title: 'STXinwei 华文新魏'
        },{
          img: '/static/img/edit/font03.png',
          title: 'STLiti 华文隶书'
        },{
          img: '/static/img/edit/font01.png',
          title: 'STHupo 华文琥珀'
        },{
          img: '/static/img/edit/font02.png',
          title: 'STCaiyun 华文彩云'
        },{
          img: '/static/img/edit/font03.png',
          title: 'FZYaoti 方正姚体'
        },{
          img: '/static/img/edit/font01.png',
          title: 'Delicious'
        },{
          img: '/static/img/edit/font02.png',
          title: 'Hoefler Text'
        },{
          img: '/static/img/edit/font03.png',
          title: 'STXinwei'
        }]
      },{
        tag: 'bg',
        name: '背景',
        item: [{
          img: '/static/img/edit/bg01.png'
        },{
          img: '/static/img/edit/bg02.png'
        },{
          img: '/static/img/edit/bg03.png'
        },{
          img: '/static/img/edit/bg01.png'
        },{
          img: '/static/img/edit/bg02.png'
        }]
      },{
        tag: 'pic',
        name: '图片',
        item: [{
          img: '/static/img/edit/bg01.png'
        },{
          img: '/static/img/edit/bg02.png'
        },{
          img: '/static/img/edit/bg03.png'
        },{
          img: '/static/img/edit/bg01.png'
        },{
          img: '/static/img/edit/bg02.png'
        }]
      },{
        tag: 'decorate',
        name: '装饰',
        item: [{
          img: '/static/img/edit/decorate01.png'
        },{
          img: '/static/img/edit/decorate02.png'
        },{
          img: '/static/img/edit/decorate03.png'
        },{
          img: '/static/img/edit/decorate04.png'
        },{
          img: '/static/img/edit/decorate02.png'
        }]
      },{
        tag: 'layout',
        name: '布局',
        item: [{
          img: '/static/img/edit/layout01.png'
        },{
          img: '/static/img/edit/layout02.png'
        },{
          img: '/static/img/edit/layout03.png'
        },{
          img: '/static/img/edit/layout04.png'
        },{
          img: '/static/img/edit/layout05.png'
        },{
          img: '/static/img/edit/layout06.png'
        },{
          img: '/static/img/edit/layout01.png'
        },{
          img: '/static/img/edit/layout02.png'
        },{
          img: '/static/img/edit/layout03.png'
        }]
      }]
    }
  },
  methods: {
    hoverIn(idx) {
      this.curChangeIconIdx = idx
    },
    hoverOut(idx) {
      this.curChangeIconIdx = -1
    },
    showList(idx, e) {
      if(this.curShowListIdx === -1) {
        this.curShowListIdx = idx
        this.curChangeIconIdx = idx
      } else {
        this.curShowListIdx = -1
        this.curChangeIconIdx > 0 ? idx : -1
      }
    },
    editListClick(name, idx, e) {
      switch (name) {
        case '模板': // 模板
          console.log('模板', idx)
          break
        case '文字': // 文字
          console.log('文字', idx)          
          break
        case '背景': // 背景
          console.log('背景', idx)          
          break
        case '图片': // 图片
          console.log('图片', idx)          
          break
        case '装饰': // 装饰
          console.log('装饰', idx)          
          break
        case '布局': // 布局
          console.log('布局', idx)        
          break
      }
    },
    stopParentEvent(e) {
      e.stopPropagation() // 阻止事件冒泡而触发父级的click事件
    },
    drag(ev) {
      var imgElement = ev.target
      fabric.Image.fromURL(imgElement.src, function(oImg) {
        // scale image down, and flip it, before adding it onto canvas
        canvas2.add(oImg.set({
          originX: 'center',
          originY: 'center',
          left: canvas2.width / 2,
          top: canvas2.height / 2
        }))
        oImg.scaleToWidth(145)
        canvas2.discardActiveObject(); // 不选中
        canvas2.setActiveObject(oImg);
        oImg.centeredScaling = true
      })
    },
    selectPic(e) {
      var vm = this
      var target = e.target
      ;[].slice.call(target.files).forEach(function(oFile, idx) {
        var src = URL.createObjectURL(oFile)
        var name = oFile.name
        var obj = {
          src: src,
          name: name
        }
        vm.filePicData.push(obj)
      })
      target.value = ''
    },
    changeBg(bgImg, obj) { // 改变背景图/页面
      fabric.Image.fromURL(bgImg, function(img) {
        var obj = new fabric.Canvas('canvasOut')
        obj.backgroundImage = img;
        obj.backgroundImage.width = 720;
        // obj.backgroundImage.width = obj.get('width');
        // obj.backgroundImage.height = obj.get('height');
        obj.add(img).renderAll();
        img.selectable = false
      })
    }
  },
  mounted() {
    var vm = this
    var canvas = new fabric.Canvas('canvasOut')
    vm.changeBg(vm.curBgImg, canvas)
    canvas.setWidth(720)
    canvas.setHeight(420)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"

.edit
  margin-top 16px
  .edit-list
    position absolute
    top 40px
    bottom 0px
    height 690px
    display inline-block
    border-radius 0 4px 0 0
    background #eee
    user-select none
    .edit-list-item
      width 180px
      background #fff
      height 40px
      line-height 40px
      text-align center
      border none
      border 1px solid #eee
      border-bottom none
      border-radius 0 4px 4px 0
      cursor pointer
      &:last-child
        border-bottom 1px solid #eee
      &.on
      &:hover
        background rgb(58, 170, 146)
        color #fff
        .icon-more
          color #fff
      >img
        padding-right 30px
      .icon-more
        padding-left 40px
        color #ccc
    .item-list
      width 180px
      position absolute
      bottom 0px
      z-index 10
      background #fff
      overflow-y scroll
      // display none
      li
        display inline-block
        margin-bottom 10px
        color #111
        &:nth-child(2n)
          margin -10px 0 0 0
        img
          box-sizing border-box
          width 170px
          padding 5px 28px
          border 2px solid #eee
          &.on
            border 2px solid rgb(58, 170, 146)
    .file
      position relative
      top 150px
      left 50%
      margin-left -47px
      display inline-block
      background rgb(58, 170, 146)
      border-radius 4px
      overflow hidden
      color #fff
      text-decoration none
      text-indent 0
      line-height 20px
      padding 8px 15px
      input
        position absolute
        font-size 100px
        right 0
        top 0
        opacity 0
      &:hover
        background rgb(43, 155, 131)
        color #fff
        text-decoration none
  .edit-content
    position absolute
    top 40px
    bottom 0px
    right 0px
    left 200px
    height 690px
    .edit-top-bor
      display flex
      justify-content space-between
      background #eee
      border-radius 4px
      ul
        display inline-block
        font-size 14px
        color #999
        &.edit-right
          i
            color rgb(255, 120, 0)
        li
          display inline-block
          height 40px
          line-height 40px
          margin 0 10px 0 2px
          i
            margin 0 10px
            color #aaa
            &.icon-eye
              color rgb(255, 120, 0)
  .canvas-box
    position absolute
    top 88px
    bottom 180px
    right 180px
    left 180px
    display flex
    justify-content center
    text-align center
    #canvasOut
      box-sizing border-box
      border 8px solid #eee
  .edit-bottom
    width 100%
    height 140px
    position absolute
    bottom 0px
    background #eee
    border-radius 4px
    font-size 12px
    .btn-box
      >div
        display inline-block
        a
          display inline-block
          padding 8px 18px
      .btn-left
        margin-left 60px
        a
          border 1px solid transparent
          &.on
          &:hover
            background #fff
            border 1px solid #ccc
        span
          color #aaa
          margin-left 20px
      .btn-right
        float right
        margin-right 60px
        img
        input
          vertical-align middle
          margin-right 5px
    .pic-box
      position relative
      height 105px
      top 5px
      .btn
        btn(#eee)
      .img-list
        position absolute
        top 0px
        bottom 0px
        left 60px
        right 60px
        overflow-x auto
        overflow-y hidden
        white-space nowrap
        #ul1
          height 105px
          white-space nowrap
          li
            display inline-block
            margin 0 10px 0 0 
            position relative
            min-width 90px
            text-align center
            h1
              position absolute
              width 90px
              height 20px
              left 50%
              margin-left -45px
              line-height 20px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
</style>
