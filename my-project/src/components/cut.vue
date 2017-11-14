<template>
  <div class="cutMask" v-if="cutImgData.isCutImg">
    <div class="cut-bok">
      <div class="cut-left">
        <p><i class="icon-cut"></i>照片剪切</p>
        <div class="clip-outBox" :title="imgData.width + 'x' + imgData.height"
          @mousedown="clipImgDown"
        >
          <canvas id="clipCanvas"></canvas>
          <div class="clip-box">
            <div class="clip-content"></div>
            <div class="resize">
              <div class="line drag">
                <div class="l"></div>
                <div class="t"></div>
                <div class="r"></div>
                <div class="b"></div>
              </div>
              <div class="corner">
                <div class="lt"></div>
                <div class="rt"></div>
                <div class="rb"></div>
                <div class="lb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cut-right">
        <i class="icon-close" @click="closeCut"></i>
        <ul class="cut-edit">
          <li class="num">
            <i class="icon-circle-left"></i>
            <span>1 / 1</span>
            <i class="icon-circle-right"></i>
          </li>
          <li class="size">
            <p>可选尺寸:</p>
            <label for="6寸" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="imgSize" id="6寸">
              <span>6寸</span>
            </label>
            <label for="全景6寸" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="imgSize" id="全景6寸">
              <span>全景6寸</span>
            </label>
            <label for="7寸" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="imgSize" id="7寸">
              <span>7寸</span>
            </label>
            <label for="8寸" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="imgSize" id="8寸">
              <span>8寸</span>
            </label>
            <label for="10寸" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="imgSize" id="10寸">
              <span>10寸</span>
            </label>
          </li>
          <li class="shape">
            <p>裁剪形状:</p>
            <label for="vertical" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="shape" id="vertical">
              <i class="vertical"></i>
            </label>
            <label for="horizontal" class="radio" @click="editImg('radio', $event)">
              <input type="radio" name="shape" id="horizontal">
              <i class="horizontal"></i>
            </label>
          </li>
          <li class="info">
            <p>裁剪形状: <span> 639 * 958 pixel</span></p>
            <p>最佳冲印尺寸: 10寸</p>
          </li>
          <li class="filters">
            <label for="增加白边框" class="checkbox" @click="editImg('checkbox', $event)">
              <input type="checkbox" name="filters" id="增加白边框">
              <span>增加白边框</span>
            </label>
            <label for="自动色彩调整" class="checkbox" @click="editImg('checkbox', $event)">
              <input type="checkbox" name="filters" id="自动色彩调整">
              <span>自动色彩调整</span>
            </label>
            <label for="自动肤色调整" class="checkbox" @click="editImg('checkbox', $event)">
              <input type="checkbox" name="filters" id="自动肤色调整">
              <span>自动肤色调整</span>
            </label>
            <label for="光面" class="checkbox" @click="editImg('checkbox', $event)">
              <input type="checkbox" name="filters" id="光面">
              <span>光面</span>
            </label>
            <label for="绒面" class="checkbox" @click="editImg('checkbox', $event)">
              <input type="checkbox" name="filters" id="绒面">
              <span>绒面</span>
            </label>
          </li>
          <li class="btns">
            <div class="btn-save">保存</div>
            <div class="btn-remove">移除</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cut',
  props: ['cutImgData'],
  data () {
    return {
      curCutCanvas: '',
      cutImg: '',
      imgData: '',
    }
  },
  watch: {
    
  },
  methods: {
    editImg(type, e) {
      e.preventDefault()
      var vm = this
      var target = e.target
      var ratio = vm.cutImg.height / vm.cutImg.width
      var w
      var h
      if(type === 'radio') {
        var radio = target.closest('.radio')
        if(radio.className.indexOf('on') > -1) {
          $(radio).removeClass("on")
        } else {
          $(radio).addClass("on").siblings().removeClass("on")
          // console.log(radio.htmlFor)
          switch (radio.htmlFor) {
            case '6寸': // 800×1200 (4 x 6)
              if(ratio >= 1) {
                w = 800
                h = 800 * ratio
              } else {
                w = 1200 / ratio
                h = 1200
              }
              vm.cutImg.set({
                'width': w,
                'height': h,
                'clipTo': function(ctx) {
                  ctx.rect(
                    -400,
                    -600,
                    800,
                    1200
                  )
                  // ctx.rotate(vm.cutImg.rotate)
                  // ctx.scale(2, 2)
                }
              })
              break
            case '全景6寸': // 1800x1350 (6 x 4.5)

              break
            case '7寸': // 1000×1400 (5 x 7)

              break
            case '8寸': // 1200×1600 (6 x 8)

              break
            case '10寸': // 1600×2000 (8 x 10)

              break
            case 'vertical': // 纵向

              break
            case 'horizontal': // 横向

              break
          }
          vm.curCutCanvas.setActiveObject(vm.cutImg)
          vm.curCutCanvas.renderAll()
          console.log(vm.cutImg)
        }
      } else if(type === 'checkbox') {

      }
    },
    closeCut(e) {
      var vm = this
      vm.cutImgData.isCutImg = false
    },
    clipImgDown(e) {
      var x1 = e.clientX
      var y1 = e.clientY
      var target = e.target
      var box = target.closest('.clip-box')
      // var outBox = target.closest('.clip-outBox')
      var clipContent = target.closest('.clip-content')
      var resize = target.closest('.resize')
      var sClass = target.className
      var pointBox = document.getElementsByClassName('clip-box')[0]
      var pointOutBox = document.getElementsByClassName('clip-outBox')[0]

      // 开始裁剪
      /*if(target.className === 'clipStart-btn') {
        pointOutBox.style.display = 'flex'
        pointOutBox.style.left = canvas.wrapperEl.offsetLeft + 'px'
        pointOutBox.style.top = canvas.wrapperEl.offsetTop + 'px'
      }*/

      // 保存
      if(target.className === 'btn-save') {
        var clip2X = pointBox.offsetLeft
        var clip2Y = pointBox.offsetTop
        var clip2W = pointBox.offsetWidth
        var clip2H = pointBox.offsetHeight
        var oX = oImg.width / 2
        var oY = oImg.height / 2
        var canvasItemL = canvas.item(0).left
        var canvasItemT = canvas.item(0).top
        var rectX = clip2X - canvasItemL
        var rectY = clip2Y - canvasItemT
        oImg.set('clipTo', function(ctx) {
          ctx.rect(-oX+rectX, -oY + rectY, clip2W, clip2H)
        })
        canvas.renderAll()
        pointOutBox.style.display = 'none'

      }

      if (!box) {
        return
      }

      e.preventDefault && e.preventDefault()
      //当捕捉到事件(event)时，判断为false，则阻止当前事件继续运行
      e.returnValue = false

      var originX = box.offsetLeft
      var originY = box.offsetTop
      var originW = box.offsetWidth
      var originH = box.offsetHeight

      if (clipContent) {
        // 拖拽，改变位置
        // document.onmousemove = function(e) {
        pointOutBox.onmousemove = function(e) {
          var x2 = e.clientX
          var y2 = e.clientY
          var x = x2 - x1 + originX
          var y = y2 - y1 + originY
          box.style.left = x + 'px'
          box.style.top = y + 'px'
        }
        // document.onmouseup = function() {
        pointOutBox.onmouseup = function() {
          // document.onmousemove = document.onmouseup = null
          pointOutBox.onmousemove = pointOutBox.onmouseup = null
          clip2X = box.offsetLeft
          clip2Y = box.offsetTop
          clip2W = box.offsetWidth
          clip2H = box.offsetHeight
        }
      }

      if (resize) {
        // 拖拽，改变尺寸
        document.onmousemove = function(e) {
          var x2 = e.clientX
          var y2 = e.clientY
          var l, t, w, h
          var isL = sClass.indexOf('l') > -1
          var isT = sClass.indexOf('t') > -1
          var o = {}
          if (isL) {
            o.left = x2 - x1 + originX
          }
          if (isT) {
            o.top = y2 - y1 + originY
          }
          o.width = (isL ? x1 - x2 : x2 - x1) + originW
          o.height = (isT ? y1 - y2 : y2 - y1) + originH

          var iMin = 80
          if (o.width < iMin) {
            o.width = iMin
            if (isL) {
              o.left = originX + originW - iMin
            }
          }
          if (o.height < iMin) {
            o.height = iMin
            if (isT) {
              o.top = originY + originH - iMin
            }
          }


          var json = {
            'l': ['left', 'width'],
            't': ['top', 'height'],
            'r': ['width'],
            'b': ['height'],
            'lt': ['left', 'width', 'top', 'height'],
            'rt': ['top', 'width', 'height'],
            'rb': ['width', 'height'],
            'lb': ['left', 'width', 'height'],
          }
          json[sClass].forEach(function(attr, idx) {
            box.style[attr] = o[attr] + 'px'
          })
        }
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null
          clip2X = box.offsetLeft
          clip2Y = box.offsetTop
          clip2W = box.offsetWidth
          clip2H = box.offsetHeight
        }
      }

    },
  },
  mounted() {
    var vm = this
    vm.$nextTick(function() { // dom已更新
      var originImg = fabric.util.object.clone(vm.cutImgData.cutImg)
      var originRatio = originImg.height / originImg.width
      var w
      var h
      if(originRatio >= 1) {
        w = originImg.width - originImg.strokeWidth,
        h = originImg.width * originRatio
      } else {
        h = originImg.height - originImg.strokeWidth
        w = h / originRatio
      }
      vm.cutImg = fabric.util.object.clone(vm.cutImgData.cutImg)
      // console.log(vm.cutImg)
      var canvas = new fabric.Canvas('clipCanvas')
      vm.curCutCanvas = canvas
      canvas.setWidth(410)
      canvas.setHeight(453)
      canvas.add(vm.cutImg)
      canvas.renderAll()
      vm.cutImg.set({
        originX: 'center',
        originY: 'center',
        top: 227,
        left: 205,
        width: w,
        height: h,
        'clipTo': function(ctx) {
          ctx.rect(-227, -205, 410, 453)
        }
      })
      canvas.setActiveObject(vm.cutImg)
      canvas.renderAll()
      vm.imgData = vm.cutImg
      console.log(vm.imgData)

      vm.curCutCanvas = canvas


    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cutMask
  position absolute
  top 0px
  left 0px
  right 0px
  bottom 0px
  background rgba(0, 0, 0, 0.5)
  .cut-bok
    // width 57.5%
    // height 70%
    width 880px
    height 520px
    margin 100px auto
    background #fff
    .cut-left
      float left
      width 50%
      height 100%
      p
        padding 8px 30px
        .icon-cut
          position relative
          margin-right 10px
          top 4px
          font-size 24px
          color rgb(255, 120, 0)
      // .img-box
      //   width 93%
      //   height 87%
      //   background rgba(0, 0, 0, 0.5)
      //   margin 10px auto
      //   position relative
      //   overflow hidden
      .clip-outBox
        width 410px
        height 453px
        position relative
        margin 10px auto
        top 0px
        left 0
        overflow hidden
        display flex
        justify-content center
        align-items center
        overflow hidden
        background rgba(0, 0, 0, 0.5)
        // display none
        #clipCanvas
          transform scale(1, 1)
        .clip-box
          width 200px
          height 150px
          position absolute
          box-shadow 0 0 0 1000px rgba(0,0,0,0.3)
          -display none
          .clip-content
            width 100%
            height 100%
            cursor move
            background linear-gradient(rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 30%) 0 0 / 34% 34%, linear-gradient(90deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 34%) 0 0 / 34% 34%
            border none
            border-right 1px solid rgba(255,255,255,0.3)
            border-bottom 1px solid rgba(255,255,255,0.3)
          .resize 
            >div 
              >div
                position absolute
                left -1px
                top -1px
            .line 
              >div
                width 1px
                height 1px
                -background red
              .l
                height 100%
                &:after
                  content ''
                  position absolute
                  top 50%
                  margin-top -6px
                  width 3px
                  height 12px
                  background #fff
              .t
                width 100%
                &:after
                  content ''
                  position absolute
                  left 50%
                  margin-left -6px
                  width 12px
                  height 3px
                  background #fff
              .r
                height 100%
                left auto
                right 0px
                &:after
                  content ''
                  position absolute
                  top 50%
                  left auto
                  right -1px
                  margin-top -6px
                  width 3px
                  height 12px
                  background #fff
              .b
                width 100%
                top auto
                bottom -1px
                &:after
                  content ''
                  position absolute
                  top auto
                  bottom -0.5px
                  left 50%
                  margin-left -6px
                  width 12px
                  height 3px
                  background #fff
            .drag 
              .l
                width 6px
                cursor w-resize
              .t
                height 6px
                cursor n-resize
              .r
                width 6px
                cursor e-resize
              .b
                height 6px
                cursor s-resize
            .corner 
              >div
                width 12px
                height 3px
                background #fff
              .lt
                cursor nw-resize
                &:after
                  content ''
                  position absolute
                  width 3px
                  height 12px
                  background #fff
              .rt
                left auto
                right 0.5px
                cursor ne-resize
                &:after
                  content ''
                  position absolute
                  left auto
                  right -1px
                  width 3px
                  height 12px
                  background #fff
              .rb
                left auto
                right 0.5px
                top auto
                bottom -1px
                cursor se-resize
                &:after
                  content ''
                  position absolute
                  left auto
                  right 0px
                  top auto
                  bottom 0
                  right -1px
                  width 3px
                  height 12px
                  background #fff
              .lb
                top auto
                bottom -1px
                cursor sw-resize
                &:after
                  content ''
                  position absolute
                  top auto
                  bottom 0px
                  width 3px
                  height 12px
                  background #fff
    .cut-right
      float right
      width 50%
      height 100%
      .icon-close
        font-size 30px
        display inline-block
        margin 10px 10px 0 86%
        &:hover
          color red
      .cut-edit
        width 93%
        height 87%
        margin 10px auto
        li
          font-size 14px
          border-bottom 1px solid #ddd
          padding 10px 10px 10px 2px
          line-height 32px
          label
            cursor pointer
            margin-right 25px
            span
              padding 0 0px 0 8px
            input
              position relative
              &[type="radio"]:after
                content ''
                position absolute
                top -1px
                left -1px
                display inline-block
                width 12px
                height 12px
                background #fff
                border 1px solid #ddd
                border-radius 50%
            &.on
              input[type="radio"]:before
                content ''
                display inline-block
                position absolute
                width 4px
                height 4px
                left 33%
                top 33%
                border-radius 50%
                z-index 10
                background rgb(58, 170, 146)
              input[type="radio"]:after
                border 1px solid rgb(58, 170, 146)
          &.num
            padding 0px 10px 5px 2px
          // &.size
          &.shape
            padding-bottom 0px
            label
              input
                position relative
                bottom 15px
              i
                display inline-block
                width 35px
                height 45px
                background #ddd
                margin-left 8px
                &.horizontal
                  width 40px
                  height 30px
                  margin-bottom 8px
          &.info
            span
              color #999
              padding-left 5px
          &.filters
            label
              input
                position relative
                &[type="checkbox"]:after
                  content ''
                  position absolute
                  top -1px
                  left -1px
                  display inline-block
                  width 13px
                  height 13px
                  background #fff
                  border 1px solid #ddd
              &.on
                input[type="checkbox"]:before
                  content ''
                  display inline-block
                  position absolute
                  top -1px
                  left -1px
                  width 12px
                  height 12px
                  z-index 10
                  background-image url('/static/img/edit/对.svg')
                input[type="checkbox"]:after
                  border 1px solid rgb(58, 170, 146)
          &.btns
            border-bottom none
            >div
              display inline-block
              width 80px
              background rgb(58, 170, 146)
              border 1px solid rgb(58, 170, 146)
              color #fff
              text-align center
              border-radius 4px
              margin 10px 40px 0 20px
              &.btn-remove
                background #fff
                color rgb(58, 170, 146)
</style>
