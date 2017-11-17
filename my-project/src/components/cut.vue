<template>
  <!-- <div class="cutMask" v-if="cutImgData.isCutImg"> -->
  <div class="cutMask">
    <div class="cut-bok">
      <div class="cut-left">
        <p><i class="icon-cut"></i>照片剪切</p>
        <div class="cut-content">
          <div class="clip-outBox" :title="imgData.width + 'x' + imgData.height"
            @mousedown="clipImgDown"
          >
            <canvas id="clipCanvas"></canvas>
            <div class="clip-box" v-show="isShowClipBox">
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
          <div class="zoom">
            <span>{{(scale*0.1).toFixed(1)}} &nbsp;&nbsp; </span>
            <i class="icon-search-minus" @click="canvasResize"></i>
            <input type="range" min="1" max="20" v-model="scale" class="canvasSize"
              @input="canvasResize"
            >
            <i class="icon-search-plus" @click="canvasResize"></i>
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
            <p>裁剪形状: <span> {{(imgSize.w*1).toFixed(0)}} * {{(imgSize.h*1).toFixed(0)}} pixel</span></p>
            <p>最佳冲印尺寸: {{imgSize.cun}}</p>
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
            <div class="btn-cut" @click="imgToClip">确定</div>
            <div class="btn-remove" @click="resetImg">重置</div>
            <div class="btn-save" @click="clipSave">保存</div>
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
      curWhiteRect: '',
      cutImg: '',
      isShowClipBox: true,
      isSave: true,
      originImg: '',
      imgData: '',
      scale: 10,
      imgSize: {
        w: 800,
        h: 1200,
        cun: '6寸',
        size: '800x1200'
      },
      imgCutAfterData: {
        width: '',
        height: '',
        clipTo: '',
        filters: '',
      },
      cutGroup: []
    }
  },
  computed: {
    spaceTL() {
      var vm = this
      var o = {}
      o.spaceT = vm.cutImg.curCanvasInObj.top + vm.cutImg.curCanvasInObj.strokeWidth-(vm.originImg.top - vm.originImg.height / 2)
      o.spaceL = vm.cutImg.curCanvasInObj.left + vm.cutImg.curCanvasInObj.strokeWidth-(vm.originImg.left - vm.originImg.width / 2)
      return o
    },
  },
  watch: {
    scale(newVal) {
      $('.clip-outBox').css('transform', 'scale(' + newVal*0.1 + ', ' + newVal*0.1 + ')')
    }
  },
  methods: {
    resetImg() { // 重置
      var vm = this
      vm.isShowClipBox = true
      vm.curCutCanvas.clear()
      $('.size label').siblings().removeClass("on")
      $('.shape label').siblings().removeClass("on")
      $('.filters label').siblings().removeClass("on")
      var cutImg = fabric.util.object.clone(vm.cutImgData.cutImg)
      var originRatio = cutImg.height / cutImg.width
      var w
      var h
      if(originRatio >= 1) {
        w = cutImg.width - cutImg.strokeWidth,
        h = cutImg.width * originRatio
      } else {
        h = cutImg.height - cutImg.strokeWidth
        w = h / originRatio
      }
      cutImg.set({
        originX: 'center',
        originY: 'center',
        top: 227,
        left: 205,
      })
      vm.curCutCanvas.add(cutImg)
      vm.curCutCanvas.setActiveObject(cutImg)
      vm.curCutCanvas.renderAll()
      vm.cutImg = cutImg
      // vm.imgData = vm.cutImg
      $('.clip-box').css({
        'top': vm.cutImg.top - vm.cutImg.height / 2 + vm.spaceTL.spaceT,
        'left': vm.cutImg.left - vm.cutImg.width / 2 + vm.spaceTL.spaceL,
        'width': vm.cutImg.curCanvasInObj.width - vm.cutImg.curCanvasInObj.strokeWidth,
        'height': vm.cutImg.curCanvasInObj.height - vm.cutImg.curCanvasInObj.strokeWidth,
      })
    },
    removeWhiteRect(obj) {
      var vm = this
      if(obj) {
        var l = $('.clip-box').css('left').replace('px', '')*1/* + 6*/
        var t = $('.clip-box').css('top').replace('px', '')*1/* + 6*/
        var w = $('.clip-box').css('width').replace('px', '')*1/* - 12*/
        var h = $('.clip-box').css('height').replace('px', '')*1/* - 12*/
        $('.clip-box').css({
          left: l,
          top: t,
          width: w,
          height: h,
        })
        $($('#增加白边框')[0].closest('label')).removeClass("on")
        vm.curCutCanvas.remove(obj)
        vm.curWhiteRect = ''
        vm.curCutCanvas.renderAll()
      }
    },
    addWhiteRect() {
      var vm = this
      /*if(vm.curWhiteRect) {
        vm.curCutCanvas.remove(vm.curWhiteRect)
        vm.curWhiteRect = ''
        vm.resetImg()
        return
      }*/
      // if($('#增加白边框')[0].closest('label').className.indexOf('on') > -1) {}
      var l = $('.clip-box').css('left').replace('px', '')*1/* - 6*/
      var t = $('.clip-box').css('top').replace('px', '')*1/* - 6*/
      var w = $('.clip-box').css('width').replace('px', '')*1 - 6
      var h = $('.clip-box').css('height').replace('px', '')*1 - 6
      var rect = new fabric.Rect({
        left: l,
        top: t,
        width: w,
        height: h,
        fill: 'transparent',
        strokeWidth: 6,
        stroke: '#fff',
      })
      vm.curCutCanvas.add(rect)
      vm.curWhiteRect = rect
      $('.clip-box').css({
        left: l,
        top: t,
        // width: w + 6,
        // height: h/* + 6*/,
      })

      /*var group = new fabric.Group([vm.cutImg, rect])
      vm.curCutCanvas.clear()
      vm.curCutCanvas.add(group)*/

      vm.curCutCanvas.discardActiveObject()
      vm.curCutCanvas.renderAll()

    },
    editImg(type, e) {
      e.preventDefault()
      var vm = this
      var target = e.target
      var ratio = vm.cutImg.curCanvasInObj.height / vm.cutImg.curCanvasInObj.width
      // var ratio = vm.cutImg.height / vm.cutImg.width
      var w
      var h
      vm.isShowClipBox = true
      vm.cutImg.set({
        originX: 'center',
        originY: 'center',
        // top: 227,
        // left: 205,
        // top: vm.originImg.top,
        // left: vm.originImg.left,
      })
      if(vm.curWhiteRect) {
        vm.curWhiteRect.set({
          originX: 'center',
          originY: 'center',
          top: vm.cutImg.top,
          left: vm.cutImg.left,
        })
      }
      if(type === 'radio') {
        /*// '可选尺寸' 与 '裁剪形状' 不共存
        $('.size label').siblings().removeClass("on")
        $('.shape label').siblings().removeClass("on")*/
        /*// 初始化
        vm.resetImg()*/
        if(vm.curWhiteRect) {
          vm.removeWhiteRect(vm.curWhiteRect)
        }
        var radio = target.closest('.radio')
        if(radio.className.indexOf('on') > -1) {
          $(radio).removeClass("on")
        } else {
          $(radio).addClass("on").siblings().removeClass("on")
          $('.clip-box').css({
            'top': vm.cutImg.top - vm.cutImg.height / 2 + vm.spaceTL.spaceT,
            'left': vm.cutImg.left - vm.cutImg.width / 2 + vm.spaceTL.spaceL,
          })
          switch (radio.htmlFor) {
            case '6寸': // 800×1200 (4 x 6)
              vm.imgSize.cun = '6寸' 
              vm.imgSize.size = '800×1200'
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (4 / 6)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (4 / 6)
              }
              break
            case '全景6寸': // 1800x1350 (6 x 4.5)
              vm.imgSize.cun = '全景6寸' 
              vm.imgSize.size = '1800x1350'
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (6 / 4.5)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (6 / 4.5)
              }
              break
            case '7寸': // 1000×1400 (5 x 7)
              vm.imgSize.cun = '7寸' 
              vm.imgSize.size = '1000×1400'
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (5 / 7)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (5 / 7)
              }
              break
            case '8寸': // 1200×1600 (6 x 8)
              vm.imgSize.cun = '8寸' 
              vm.imgSize.size = '1200×1600'
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (6 / 8)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (6 / 8)
              }
              break
            case '10寸': // 1600×2000 (8 x 10)
              vm.imgSize.cun = '10寸' 
              vm.imgSize.size = '1600×2000'
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (8 / 10)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (8 / 10)
              }
              break
            case 'vertical': // 纵向
              vm.imgSize.size = '800×1200'
              vm.imgSize.cun = '6寸' 
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (4 / 6)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (4 / 6)
              }
              break
            case 'horizontal': // 横向
              vm.imgSize.size = '1800x1350'
              vm.imgSize.cun = '全景6寸' 
              if(ratio >= 1) {
                w = vm.cutImg.curCanvasInObj.width
                h = vm.cutImg.curCanvasInObj.width / (6 / 4.5)
              } else {
                h = vm.cutImg.curCanvasInObj.height
                w = vm.cutImg.curCanvasInObj.height * (6 / 4.5)
              }
              break
          }
          $('.clip-box').css({
            'width': w - vm.cutImg.curCanvasInObj.strokeWidth,
            'height': h - vm.cutImg.curCanvasInObj.strokeWidth,
          })
          vm.imgSize.w = $('.clip-box').css('width').replace('px', '')
          vm.imgSize.h = $('.clip-box').css('height').replace('px', '')
          vm.imgCutAfterData.width = vm.imgSize.size.split('x')[0]
          vm.imgCutAfterData.height = vm.imgSize.size.split('x')[1]
          // vm.curCutCanvas.setActiveObject(vm.cutImg)
        }
      } else if(type === 'checkbox') {
        var checkbox = target.closest('.checkbox')
        if(checkbox.className.indexOf('on') > -1) {
          $(checkbox).removeClass("on")
          vm.removeWhiteRect(vm.curWhiteRect)
        } else {
          $(checkbox).addClass("on")
          switch (checkbox.htmlFor) {
            case '增加白边框':
              vm.addWhiteRect()
              break
            case '自动色彩调整':
              var filter = new fabric.Image.filters.Convolute({ // blur
                  matrix: [ 1/8, 1/8, 1/8,
                            1/8, 1/8, 1/8,
                            1/8, 1/8, 1/8 ]
              })
              vm.cutImg.filters.push(filter)
              vm.cutImg.filters = vm.cutImg.filters.slice(-1)
              vm.cutImg.applyFilters(vm.curCutCanvas.renderAll.bind(vm.curCutCanvas)) 
              break
            case '自动肤色调整':
              var filter = new fabric.Image.filters.ColorMatrix({
                  matrix: [
                   1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502,
                   -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203,
                   -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946,
                   0, 0, 0, 1, 0
                  ]
              })
              vm.cutImg.filters.push(filter)
              vm.cutImg.filters = vm.cutImg.filters.slice(-1)
              vm.cutImg.applyFilters(vm.curCutCanvas.renderAll.bind(vm.curCutCanvas)) 
              break
            case '光面':
              vm.cutImg.filters.push(new fabric.Image.filters.Sepia())
              vm.cutImg.filters = vm.cutImg.filters.slice(-1)
              vm.cutImg.applyFilters(vm.curCutCanvas.renderAll.bind(vm.curCutCanvas))
              break
            case '绒面':
              var filter = new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
              });
              vm.cutImg.filters.push(filter)
              vm.cutImg.filters = vm.cutImg.filters.slice(-1)
              vm.cutImg.applyFilters(vm.curCutCanvas.renderAll.bind(vm.curCutCanvas)) 
              break
          }
        }
      }
      vm.curCutCanvas.renderAll()
    },
    closeCut(e) {
      e.preventDefault()
      e.stopPropagation()
      var vm = this
      if(vm.isSave) {
        vm.cutImgData.isCutImg = false
      } else {
        var isTrue = confirm('是否保存')
        if(isTrue === true) {
          vm.clipSave()
        } else {
          vm.cutImgData.isCutImg = false
        }
      }
    },
    clipImgDown(e) {
      var x1 = e.clientX
      var y1 = e.clientY
      var target = e.target
      var box = target.closest('.clip-box')
      var clipContent = target.closest('.clip-content')
      var resize = target.closest('.resize')
      var sClass = target.className

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
        target.onmousemove = function(e) {
          var x2 = e.clientX
          var y2 = e.clientY
          var x = x2 - x1 + originX
          var y = y2 - y1 + originY
          box.style.left = x + 'px'
          box.style.top = y + 'px'
        }
        target.onmouseup = function() {
          target.onmousemove = target.onmouseup = null
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
        }
      }

    },
    imgToClip() {
      var vm = this
      vm.isSave = false
      vm.cutGroup = []
      if(vm.isShowClipBox === true) {
        var pointBox = $('.clip-box')[0]
        var l = $('.clip-box').css('left').replace('px', '')*1
        var t = $('.clip-box').css('top').replace('px', '')*1
        var w = $('.clip-box').css('width').replace('px', '')*1
        var h = $('.clip-box').css('height').replace('px', '')*1
        var imgL = vm.cutImg.aCoords.tl.x
        var imgT = vm.cutImg.aCoords.tl.y
        var imgW = vm.cutImg.aCoords.br.x - imgL
        var imgH = vm.cutImg.aCoords.br.y - imgT
        var moveT = t - imgT
        var moveL = l - imgL
        vm.cutImg.set({
          'clipTo': function(ctx) {
            ctx.rect(-imgW/2 + moveL, -imgH/2 + moveT, w, h)
            ctx.rotate(vm.cutImg.myAngle * (Math.PI / 180))
            ctx.scale(vm.cutImg.myScale, vm.cutImg.myScale)
          }
        })
        vm.cutImg.clipRect = {
          'left': -imgW/2 + moveL,
          'top': -imgH/2 + moveT,
          'width': w,
          'height': h,
          'myAngle': vm.cutImg.myAngle * (Math.PI / 180),
          'myScale': vm.cutImg.myScale
        }
        vm.curCutCanvas.renderAll()

        var objs = vm.curCutCanvas.getObjects()
        objs.forEach(function(item, idx) {
          vm.cutGroup.push(item)
        })

        /*var group = new fabric.Group(vm.cutGroup)
        vm.curCutCanvas.clear()
        vm.curCutCanvas.add(group)*/
        vm.isShowClipBox = !vm.isShowClipBox
      }
    },
    canvasResize(e) {
      e.preventDefault()
      var vm = this
      vm.scale *= 1
      switch (e.target.className) {
        case 'icon-search-minus':
          vm.scale <= 1 ? vm.scale = 1 : vm.scale -= 1
          break
        case 'icon-search-plus':
          vm.scale >= 20 ? vm.scale = 20 :  vm.scale += 1
          break
        case 'canvasSize':
          vm.scale = e.target.value
          break
      }
    },
    clipSave() {
      var vm = this
      var group = new fabric.Group(vm.cutGroup)
      vm.curCutCanvas.clear()
      vm.curCutCanvas.add(group)
      this.$emit('clip-save', group)
      vm.isSave = true
      vm.cutImgData.isCutImg = false
    }
  },
  mounted() {
    var vm = this
    vm.$nextTick(function() { // dom已更新
      vm.originImg = fabric.util.object.clone(vm.cutImgData.cutImg)
      var canvas = new fabric.Canvas('clipCanvas')
      vm.curCutCanvas = canvas
      canvas.setWidth(410)
      canvas.setHeight(453)

      vm.resetImg()

      vm.imgSize.w = $('.clip-box').css('width').replace('px', '')
      vm.imgSize.h = $('.clip-box').css('height').replace('px', '')

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
  z-index 11
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
      .cut-content
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
        background #666
        .clip-outBox
          width 410px
          height 453px
          position relative
          top 0px
          left 0
          display flex
          justify-content center
          align-items center
          background #666
          .clip-box
            width 200px
            height 150px
            position absolute
            box-shadow 0 0 0 50000px rgba(0,0,0,0.3)
            // display none
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
        .zoom
          position absolute
          bottom 0px
          right 0px
          user-select none
          span
            color #aaa
          .canvasSize
            vertical-align middle
          i
            color #aaa
            &:hover
              color #333
    .cut-right
      float right
      width 50%
      height 100%
      user-select none
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
            i
              color #999
              &:hover
                color #000
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
              text-align center
              background #fff
              color rgb(58, 170, 146)
              border 1px solid rgb(58, 170, 146)
              border-radius 4px
              margin 10px 30px 0 10px
              cursor pointer
              &:hover
                background rgb(58, 170, 146)
                color #fff
              &.btn-save
                background rgb(58, 170, 146)
                color #fff
              // &.btn-remove
</style>
