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
          <li v-for="(v, i) in item.item" :class="{'on': i === 0}">
            <img :src="v.img" alt="" :title="v.title" @click="editListClick(item.name, i, $event)">
            <h1 v-if="item.name === '模板'">{{v.tag}}</h1>
          </li>
        </ul>
      </li>
      <a href="javascript:;" class="file">添加照片
        <input type="file" name="" id="fileEL" multiple="" @change="addPics">
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
      <div class="canvas-box"
        @dragover='allowDrop'
        @drop='drop'
      >
        <canvas id="canvasOut"></canvas>
        <!-- 文字编辑框 -->
        <ul class="font-edit" v-if="isAddtext" @mousedown="fontEditDown">
          <span class="close" @click="isAddtext = false">x</span>
          <li>
            <select class="selectFontFamily" v-model="fontEditData.fontFamily" @change="curText && changeSelect('fontFamily', curText, curObj, $event)">
              <option style="font-family: 'STXingkai'" value="STXingkai">STXingkai 华文行楷</option>
              <option style="font-family: 'STXinwei'" value="STXinwei">STXinwei 华文新魏</option>
              <option style="font-family: 'STLiti'" value="STLiti">STLiti 华文隶书</option>
              <option style="font-family: 'STHupo'" value="STHupo">STHupo 华文琥珀</option>
              <option style="font-family: 'STCaiyun'" value="STCaiyun">STCaiyun 华文彩云</option>
              <option style="font-family: 'FZYaoti'" value="FZYaoti">FZYaoti 方正姚体</option>
              <option style="font-family: 'Delicious'" value="Delicious">Delicious</option>
              <option style="font-family: 'Hoefler Text'" value="Hoefler Text">Hoefler Text</option>
              <option style="font-family: 'STXinwei'" value="STXinwei">STXinwei</option>
            </select>
            <select class="selectFontSize" v-model="fontEditData.fontSize" @change="curText && changeSelect('fontSize', curText, curObj, $event)">
              <option value="8">8px</option>
              <option value="9">9px</option>
              <option value="10">10px</option>
              <option value="11">11px</option>
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="20">20px</option>
              <option value="22">22px</option>
              <option value="24">24px</option>
              <option value="26">26px</option>
              <option value="28">28px</option>
              <option value="36">36px</option>
              <option value="48">48px</option>
              <option value="72">72px</option>
            </select>
            <span class="bold" @click="changeFontStyle('fontWeight', curText, curObj)"><img src="/static/img/edit/bold.svg" alt="" :style="fontEditData.fontWeight === 'bold' ? 'border: 1px solid rgb(98, 162, 228); background: rgb(201, 224, 247)' : 'border: 1px solid transparent'"></span>
            <span class="italic" @click="changeFontStyle('fontStyle', curText, curObj)"><img src="/static/img/edit/italic.svg" alt="" :style="fontEditData.fontStyle === 'italic' ? 'border: 1px solid rgb(98, 162, 228); background: rgb(201, 224, 247)' : 'border: 1px solid transparent'"></span>
            <span class="leftAlign" @click="changeFontStyle('textAlign', curText, curObj, 'left')"><img src="/static/img/edit/leftAlign.svg" alt="" :style="fontEditData.textAlign === 'left' ? 'border: 1px solid rgb(98, 162, 228); background: rgb(201, 224, 247)' : 'border: 1px solid transparent'"></span>
            <span class="centerAlign" @click="changeFontStyle('textAlign', curText, curObj, 'center')"><img src="/static/img/edit/centerAlign.svg" alt="" :style="fontEditData.textAlign === 'center' ? 'border: 1px solid rgb(98, 162, 228); background: rgb(201, 224, 247)' : 'border: 1px solid transparent'"></span>
            <span class="rightAlign" @click="changeFontStyle('textAlign', curText, curObj, 'right')"><img src="/static/img/edit/rightAlign.svg" alt="" :style="fontEditData.textAlign === 'right' ? 'border: 1px solid rgb(98, 162, 228); background: rgb(201, 224, 247)' : 'border: 1px solid transparent'"></span>
          </li>
          <li class="controls">
            <span class="moveup" @click="changeFontStyle('top', curText, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">上移
            </span>
            <span class="movedown" @click="changeFontStyle('top', curText, curObj, '+')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/down.svg" alt="">下移
            </span>
            <span class="cutImg" @click="changeFontStyle('angle', curText, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/cut.svg" alt="">旋转
            </span>
            <span class="copy" @click="changeFontStyle('flipX', curText, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/copy.svg" alt="">镜像
            </span>
            <span class="moveup" @click="changeFontStyle('bringToFront', curText, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">前置
            </span>
            <span class="removeImg" @click="removeObj(curText)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/remove.svg" alt="">删除
            </span>
          </li>
          <li class="controls">
            <div class="left">
              <div class="top">
                <label>阴影</label>
                <select class="selectFontSize" v-model="fontEditData.shadow.blur" @change="curText && changeSelect('shadow.blur', curText, curObj, $event)">
                  <option v-for="(v, i) in 11" :value="i * 1">{{i * 1}}</option>
                </select>
                <input type="color" v-model="fontEditData.shadow.color" @change="curText && changeSelect('shadow.color', curText, curObj, $event)">
                <label>描边</label>
                <select class="selectFontSize" v-model="fontEditData.strokeWidth" @change="curText && changeSelect('strokeWidth', curText, curObj, $event)">
                  <option v-for="(v, i) in 11" :value="i * 1">{{i * 1}}</option>
                </select>
                <input type="color" v-model="fontEditData.stroke" @change="curText && changeSelect('stroke', curText, curObj, $event)">
              </div>
              <div class="bottom">
                <label>边框</label>
                <select class="selectFontFrame" @change="curText && addBorder(borderData, curText, curObj, $event)">
                  <option value="无">无</option>
                  <optgroup label="方框">
                    <option value="方框1">方框1</option>
                    <option value="方框2">方框2</option>
                    <option value="方框3">方框3</option>
                  </optgroup>
                  <optgroup label="圆框">
                    <option value="圆1">圆1</option>
                    <option value="圆2">圆2</option>
                    <option value="椭圆1">椭圆1</option>
                    <option value="椭圆2">椭圆2</option>
                  </optgroup>
                  <optgroup label="多边形">
                    <option value="三角形">三角形</option>
                    <option value="五角形">五角形</option>
                    <option value="六角形">六角形</option>
                  </optgroup>
                </select>
                <span class="font-edit-color">
                  <label>边距</label>
                  <select class="selectFontSize" v-model="borderData.width" @change="curBorder && changeBorderStyle('strokeWidth', curBorder, curObj, $event)">
                    <option v-for="(v, i) in 21" :value="i * 1">{{i * 5}}</option>
                  </select>
                  <input type="color" v-model="borderData.color" @change="curBorder && changeBorderStyle('stroke', curBorder, curObj, $event)">
                </span>
              </div>
            </div>
            <div class="right">
              <span class="img-edit-scale">
                <label>大小</label>
                <input type="range" min="1" max="1500" value="500" class="img-scale" v-model="fontEditData.scale" @input="curText && changeSelect('scale', curText, curObj, $event)">
              </span>
              <span class="img-edit-opacity">
                <label>透明</label>
                <input type="range" min="1" max="1000" value="1000" class="img-opacity" v-model="fontEditData.opacity" @input="curText && changeSelect('opacity', curText, curObj, $event)">
              </span>
            </div>
            <div class="bottom">
              <span class="font-edit-content">
                <label>文字</label>
                <!-- <input type="text" class="addtext" placeholder="点击输入文字" v-model="fontEditData.world" @keyup.enter="addtext(fontEditData, curObj)"> -->
                <textarea name="" id="" cols="39" rows="2" placeholder="点击输入文字" v-model="fontEditData.world" @input="curText && changeSelect('world', curText, curObj, $event)"></textarea>
                <input type="color" v-model="fontEditData.fill" @change="curText && changeSelect('fill', curText, curObj, $event)">
                <input class="submit" type="submit" value="添加" @click="addtext(fontEditData, curObj)">
              </span>
            </div>
          </li>
        </ul>
        <!-- 图片编辑框 -->
        <ul class="font-edit img-edit" v-if="isAddimg" @mousedown="fontEditDown">
          <span class="close" @click="isAddimg = false">x</span>
          <li>
            <span class="img-edit-scale">
              <label>大小</label>
              <input type="range" min="1" max="1500" value="500" class="img-scale" v-model="fontEditData.scale" @input="curText && changeSelect('scale', curText, curObj, $event)">
            </span>
            <span class="img-edit-opacity">
              <label>透明</label>
              <input type="range" min="1" max="1000" value="1000" class="img-opacity" v-model="fontEditData.opacity" @input="curText && changeSelect('opacity', curText, curObj, $event)">
            </span>
          </li>
          <li class="controls">
            <span class="moveup" @click="changeFontStyle('top', curText, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">上移
            </span>
            <span class="movedown" @click="changeFontStyle('top', curText, curObj, '+')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/down.svg" alt="">下移
            </span>
            <span class="cutImg" @click="changeFontStyle('angle', curText, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/cut.svg" alt="">旋转
            </span>
            <span class="copy" @click="changeFontStyle('flipX', curText, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/copy.svg" alt="">镜像
            </span>
            <span class="moveup" @click="changeFontStyle('bringToFront', curText, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">前置
            </span>
            <span class="removeImg" @click="removeObj(curImg)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/remove.svg" alt="">删除
            </span>
          </li>
          <li class="controls">
            <span>图片调整</span>
            <ul class="img-style">
              <li>
                <img src="/static/img/edit/色彩优化.png" alt="">
                <p>基本调整</p>
                <!-- <input type="range" min="-1" max="1" step="0.003921" class="Saturation"> -->
                <input type="range" min="50" max="1000" value="227" class="Saturation" oninput="saturationChange(event)">
              </li>
              <li>
                <img src="/static/img/edit/黑白.png" alt="">
                <p>黑白</p>
              </li>
              <li>
                <img src="/static/img/edit/旧照片.png" alt="">
                <p>旧照片</p>
              </li>
              <li>
                <img src="/static/img/edit/素描.png" alt="">
                <p>素描</p>
              </li>
              <li>
                <img src="/static/img/edit/柔化.png" alt="">
                <p>柔化</p>
              </li>
              <li>
                <img src="/static/img/edit/锐化.png" alt="">
                <p>锐化</p>
              </li>
              <li>
                <img src="/static/img/edit/色彩叠加.png" alt="">
                <p>色彩叠加</p>
              </li>
              <li>
                <img src="/static/img/edit/基本调整.png" alt="">
                <p>色彩优化</p>
              </li>
            </ul>
          </li>
        </ul>
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
              <!-- <li v-if="!isShowPage" v-for="(img, idx) in filePicData">
                <img height="78" draggable="true" 
                :src="img.src" alt="" :clsaa="'img' + idx" 
                :title="img.name" 
                @dragstart="drag($event)"
              /> -->
              <li v-if="!isShowPage" v-for="(img, idx) in filePicData">
                <img height="78" draggable="true" 
                :src="img.src" alt="" :clsaa="'img' + idx" 
                :title="img.name" 
                @mousedown="drag($event)"
              />
                <h1 :title="img.name">{{idx + 1}}页 {{img.name}}</h1>
              </li>
              <li v-if="isShowPage" v-for="(page, idx) in filePageData">
                <img height="78" :src="page.src" alt="" :clsaa="'page' + idx" :title="page.name" draggable="true" @dragstart="drag($event)"/>
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
  created() { // 实例被创建之后
    var vm = this
    // vm.$axios.post('/api/getNewsList')
    // vm.$axios.post('/api/getOrderList', {id: 0})
    /*vm.$axios.post('/api/getNewsList', {id: 0})
    .then((res) => {
      console.log(res.data)
    }, (err) => {
      console.log(err)
    })*/


  },
  data () {
    return {
      curObj: '',
      curText: '',
      curShowListIdx: -1,
      curChangeIconIdx: -1,
      curDragImg: '',
      curCanvasInIdx: -1,
      filePicData: [],
      isAddtext: false,
      isEditBorder: false,
      curBgImg: '/static/img/edit/bg.png',
      curBorder: '',
      isAddimg: false,
      curImg: '',
      // imgEditData: {},
      borderData: {
        width: 1,
        color: '#ff0000'
      },
      fontEditData: {
        world: '',
        left: 10,
        top: -16,
        fontFamily: 'Hoefler Text',
        fontSize: 24,
        angle: 0,
        opacity: 1000,
        shadow: {
          color: '#cccccc',
          blur: 5
        },
        fontWeight: 'normal',
        fontStyle: 'normal', // 斜体
        textDecoration: 'none',
        // stroke: '', // 描边
        strokeWidth: 0, // 描边宽度
        textAlign: 'right',
        lineHeight: 1,
        textBackgroundColor: 'transparent', // 背景色
        fill: '#111111',
        flipX: false,
        flipY: false,
        padding: 2,
        scale: 500
      },
      /*borderEditData: {
        left: 10,
        top: -16,
        angle: 0,
        opacity: 1000,
        shadow: {
          color: '#cccccc',
          blur: 5
        },
        fill: 'rgba(0,0,0,0)',
        stroke: '#111111', // 描边
        strokeWidth: 0, // 描边宽度
        strokeDashArray: [5, 5],
        flipX: false,
        flipY: false,
        padding: 0,
        scale: 500
      },*/
      canvasOut: '',
      layoutData: [
        {
          "top": 160,
          "left": 73,
          "shape": "rect",
          "width": 140,
          "height": 185,
          "angle": 0,
          "borderRadius": 0,
          "border": "6px solid #fff"
        }
      ],
      canvasInObj: [],
      filePageData: [{
        src: '/static/img/edit/bg.png',
        name: '摄影'
      },{
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
          img: '/static/img/edit/bg.png'
        },{
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
  watch: {
    isAddtext(newVal) {
      var vm = this
      if(!newVal) {
        vm.curObj.discardActiveObject()
        vm.curObj.renderAll()
      }
    },
    curText(newVal) {
      var vm = this
      if(vm.isAddtext) {
        vm.fontEditData.world = vm.curText.text,
        vm.fontEditData.left = vm.curText.left,
        vm.fontEditData.top = vm.curText.top,
        vm.fontEditData.fontFamily = vm.curText.fontFamily,
        vm.fontEditData.fontSize = vm.curText.fontSize,
        vm.fontEditData.angle = vm.curText.angle,
        vm.fontEditData.opacity = vm.curText.opacity * 1000,
        vm.fontEditData.shadow = {
          'color': vm.curText.shadow.color,
          'blur': vm.curText.shadow.blur
        },
        vm.fontEditData.fontWeight = vm.curText.fontWeight,
        vm.fontEditData.fontStyle = vm.curText.fontStyle, // 斜体
        vm.fontEditData.textDecoration = vm.curText.textDecoration,
        vm.fontEditData.stroke = vm.curText.stroke, // 描边
        vm.fontEditData.strokeWidth = vm.curText.strokeWidth, // 描边宽度
        vm.fontEditData.textAlign = vm.curText.textAlign,
        vm.fontEditData.lineHeight = vm.curText.lineHeight,
        vm.fontEditData.fill = vm.curText.fill,
        vm.fontEditData.flipX = vm.curText.flipX,
        vm.fontEditData.flipY = vm.curText.flipY,
        vm.fontEditData.padding = vm.curText.padding,
        vm.fontEditData.scale = vm.curText.scaleX * 500
      }
    },
    layoutData: {　　　　
      handler(newVal, oldVal) {
        var vm = this
        var objs = []
        newVal.forEach(function(item, idx) {
          console.log('watch执行')
          var rect = new fabric.Rect({
            name: 'canvasIn' + idx,
            originX: 'center',
            originY: 'center',
            top: item.top + item.height * 0.5,
            left: item.left + item.width * 0.5,
            angle: item.angle,
            width: item.width,
            height: item.height,
            fill: 'transparent',
            stroke: '#ffffff',
            strokeWidth: 6,
          })
          var imgElement = new Image()
          imgElement.src = '/static/img/edit/dragTip.png'
          var imgInstance = new fabric.Image(imgElement, {
            originX: 'center',
            originY: 'center',
            top: item.top + item.height * 0.5,
            left: item.left + item.width * 0.5,
            angle: item.angle,
            width: item.width - 6,
            height: item.height - 6,
          })
          var group = new fabric.Group([rect, imgInstance], {
            name: 'canvasIn' + idx
          })
          vm.curObj.add(group)
          objs.push(group)
          vm.curObj.renderAll()
          group.selectable = false
        })　　
        vm.canvasInObj = objs
      },
      deep: true　　
    },
    /*layoutData(newVal, oldVal) {
      var vm = this
      var objs = []
      newVal.forEach(function(item, idx) {
        console.log('watch执行')
        var rect = new fabric.Rect({
          name: 'canvasIn' + idx,
          originX: 'center',
          originY: 'center',
          top: item.top + item.height * 0.5,
          left: item.left + item.width * 0.5,
          angle: item.angle,
          width: item.width,
          height: item.height,
          fill: 'transparent',
          stroke: '#f00',
          strokeWidth: 6,
        })
        var imgElement = new Image();
        imgElement.src = '/static/img/edit/dragTip.png'
        var imgInstance = new fabric.Image(imgElement, {
          originX: 'center',
          originY: 'center',
          top: item.top + item.height * 0.5,
          left: item.left + item.width * 0.5,
          angle: item.angle,
          width: item.width - 6,
          height: item.height - 6,
        })
        var group = new fabric.Group([rect, imgInstance])
        vm.curObj.add(group)
        objs.push(group)
        vm.curObj.renderAll()
      })　　
      vm.canvasInObj = objs
    },*/
    curBgImg(newVal, oldVal) {
      var vm = this
      vm.curObj.remove(oldVal)
    },
    canvasInObj(newVal, oldVal) {
      var vm = this
      if(oldVal) {
        oldVal.forEach(function(item, idx) {
          vm.curObj.remove(item)
        })　　
      }
    },
    curCanvasInIdx(newVal, oldVal) {
      var vm = this
      console.log(newVal, oldVal)
    },
  },
  computed: {
    /*layoutStyle() {
      var styleObj = []
      this.layoutData.forEach(function(item, idx) {
        var obj = {
          'position': 'absolute',
          'top': item.top + 'px',
          'left': item.left + 'px',
          'width': item.width + 'px',
          'height': item.height + 'px',
          'border': item.border,
          'border-radius': item.borderRadius + 'px',
          'background': 'rgb(229,229,229) url(/static/img/edit/dragTip.png) no-repeat center / contain',
        }
        styleObj.push(obj)
      })
      console.log(styleObj)
      return styleObj
    },*/
    /*canvasInObj() { // 未使用不执行
      var obj = []
      this.layoutData.forEach(function(item, idx) {
        var canvasIn = new fabric.Canvas('canvasIn' + idx)
        canvasIn.setWidth(item.width)
        canvasIn.setHeight(item.height)
        obj.push(canvasIn)
      })
      return obj
    }*/
  },
  methods: {
    hoverInColor(e) {
      e.target.children[0].src = e.target.children[0].src.slice(0, -4) + '-hover.svg'
    },
    hoverOutColor(e) {
      e.target.children[0].src = e.target.children[0].src.slice(0, -10) + '.svg'
    },
    submit(e) {
      console.log(e)
    },
    hoverIn(idx) {
      this.curChangeIconIdx = idx
    },
    hoverOut(idx) {
      this.curChangeIconIdx = -1
    },
    // canvasIn hover效果
    hoverInCanvasIn(e) {
      $(e.target).css({
        'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0.5) inset'
      })
    },
    hoverOutCanvasIn(e) {
      $(e.target).css({
        'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0) inset'
      })
    },
    showList(idx, e) {
      var vm = this
      if(this.curShowListIdx != idx) {
        this.curShowListIdx = idx
        this.curChangeIconIdx = idx
      } else {
        this.curShowListIdx = -1
        this.curChangeIconIdx > 0 ? idx : -1
      }
      if(this.curShowListIdx != 1) {
        vm.isAddtext = false
      }
    },
    editListClick(name, idx, e) {
      var vm = this
      vm.curObj.discardActiveObject()
      vm.curImg = ''
      vm.isAddimg = false
      $(e.target.closest('li')).siblings().removeClass('on')
      $(e.target.closest('li')).addClass('on')
      switch (name) {
        case '模板': // 模板
          console.log('模板', idx)
          break
        case '文字': // 文字
          vm.fontEditData = {
            world: '',
            left: 10,
            top: vm.fontEditData.top + vm.fontEditData.fontSize * 1 + 2,
            fontFamily: 'Hoefler Text',
            fontSize: 24,
            angle: 0,
            opacity: 1000,
            shadow: {
              color: '#ffffff',
              blur: 5
            },
            fontWeight: 'normal',
            fontStyle: 'normal', // 斜体
            textDecoration: 'none',
            stroke: '#111111', // 描边
            strokeWidth: 0, // 描边宽度
            textAlign: 'left',
            lineHeight: 1,
            // textBackgroundColor: 'transparent', // 背景色
            fill: '#111111',
            flipX: false,
            flipY: false,
            padding: 2,
            scale: 500
          }
          if(vm.curText) {
            vm.fontEditData.top = vm.curText.top + 26
          }
          var fontFamily = vm.editList[1].item[idx].title
          vm.fontEditData.fontFamily = fontFamily.slice(0, fontFamily.indexOf(' '))
          vm.isAddtext = true
          break
        case '背景': // 背景
          // vm.curObj.clear()
          var bgImg = e.target.src.replace('http://localhost:8090', '.')
          vm.changeBg(bgImg, vm.curObj)        
          break
        case '图片': // 图片
          console.log('图片', idx)          
          break
        case '装饰': // 装饰
          console.log('装饰', idx)          
          break
        case '布局': // 布局
          vm.$axios.post('/api/layoutData')
          .then((res) => {
            vm.layoutData = res.data[idx].canvasBox
            // vm.canvasInToObj()
          })        
          break
      }
      if(name != "文字") {
        vm.isAddtext = false
      }
    },
    addtext(data, obj) {
      var vm = this
      // 待解决:  002:  让fabric字符串换行
      // var text = new fabric.Text('with extensive \ndecoration support', { 
      var text = new fabric.Text(data.world, { 
        originX: 'center',
        originY: 'center',
        top: data.top,
        left: data.left, 
        fontFamily: data.fontFamily,
        fontSize: data.fontSize,
        strokeWidth: data.strokeWidth,
        padding: 5,
        width: 150,
        angle: data.angle,
        opacity: data.opacity * 0.001,
        fontWeight: data.fontWeight,
        fontStyle: data.fontStyle, // 斜体
        stroke: data.stroke, // 描边
        strokeWidth: data.strokeWidth, // 描边宽度
        textAlign: data.textAlign,
        lineHeight: data.lineHeight,
        textDecoration: data.textDecoration, // 下划线'underline'/中划线'line-through'/上划线'overline'
        fill : data.fill,
        flipX : data.flipX,
        flipY : data.flipY,
        // hasBorders: false,
        cornerStyle: 'circle',
      })
      text.scale(data.scale * 0.002)
      if(vm.curText) {
        text.set({  // 中心点为center后重新定位
          'top': vm.curText.top + data.fontSize * 1 + 2,
          'left': vm.curText.left
        })
      } else {
        text.set({  // 中心点为center后重新定位
          'top': text.height * 0.5 + data.top,
          'left': text.width * 0.5 + data.left
        })
      }
      text.setShadow({
        color: vm.fontEditData.shadow.color, 
        offsetX: vm.fontEditData.shadow.blur, 
        offsetY: vm.fontEditData.shadow.blur, 
        blur: vm.fontEditData.shadow.blur
      })
      console.log(text)
      obj.add(text)
      obj.renderAll()
      vm.isAddtext = false
    },
    fontEditDown(e) { // 文字编辑框移动
      // this.isAddtext = true
      if(e.target.tagName === 'UL' || e.target.tagName === 'LI') {
        var ul = $(e.target.closest('.font-edit'))
        var originX = ul.css('left').replace('px', '') * 1
        var originY = ul.css('top').replace('px', '') * 1
        // clientx(相对于浏览器) screenx(用户显示屏) pagex(也相对于浏览器但不会随着滚动条而变动) 
        var x1 = e.clientX 
        var y1 = e.clientY

        $(document).on('mousemove.fontEdit', function(e) {
          var x2 = e.clientX
          var y2 = e.clientY
          var left = x2 - x1 + originX
          var top = y2 - y1 + originY
          ul.css({
            'top': top + 'px',
            'left': left + 'px'
          })
        })
        $(document).on('mouseup.fontEdit', function(e) {
          $(document).off('mousemove.fontEdit mouseup.fontEdit')
        })
      }
    },
    changeFontStyle(name, curText, curObj, value) {
      var vm = this
      switch (name) {
        case 'fontWeight':
          vm.fontEditData.fontWeight = (vm.fontEditData.fontWeight === 'bold' ? 'normal' : 'bold')
          break
        case 'fontStyle':
          vm.fontEditData.fontStyle = (vm.fontEditData.fontStyle === 'italic' ? 'normal' : 'italic')
          break
        case 'textAlign':
          vm.fontEditData.textAlign = value
          break
        case 'top':
          if(curText) {
            vm.fontEditData.top = curText.top
            vm.fontEditData.left = curText.left
          }
          value === '-' ? vm.fontEditData.top -= 5 : vm.fontEditData.top += 5
          break
        case 'angle':
          vm.fontEditData.angle += 45
          break
        case 'flipX':
          vm.fontEditData.flipX = !vm.fontEditData.flipX
          break
        case 'bringToFront': // 前置
          curObj.bringToFront(curText)
          break
      }
      if(curText) {
        curText.set(name, vm.fontEditData[name])
        curObj.renderAll()
      }
    },
    changeSelect(name, curText, curObj, e) {
      var vm = this
      switch(name) {
        case 'strokeWidth':
          vm.fontEditData.strokeWidth = e.target.value
          curText.set({
            'strokeWidth': vm.fontEditData.strokeWidth * 1, // 为字符串则出错
            'padding': vm.fontEditData.padding
          })
          break
        case 'rect':
          /*curText.set({
            'clipTo': function(ctx) {
              ctx.save()
              // ctx.translate(-5, -5)
              ctx.fillStyle="#999"
              ctx.fillRect(100, 100, 100, 100)
              ctx.restore()
              ctx.save()
              ctx.fillStyle="#fff"
              ctx.fillRect(110, 110, 80, 80)
              ctx.restore()
            }
          })*/
          break
        case 'scale':
          vm.fontEditData.scale = e.target.value
          curText.scale(vm.fontEditData.scale * 0.002)
          break
        case 'world':
          var oldWidth = curText.width * 0.5 * curText.scaleX
          vm.fontEditData.world = e.target.value
          curText.set({
            'text': vm.fontEditData[name],
          })
          curObj.renderAll()
          var addLeft = curText.width * 0.5 * curText.scaleX - oldWidth
          curText.set({
            'left': curText.left + addLeft
          })
          break
        case 'opacity':
          vm.fontEditData.opacity = e.target.value
          curText.set('opacity', vm.fontEditData.opacity * 0.001)
          break
        default:
          if(name.indexOf('shadow') > -1) {
            vm.fontEditData.shadow[name.slice(6)] = e.target.value
            curText.setShadow({
              color: vm.fontEditData.shadow.color, 
              offsetX: vm.fontEditData.shadow.blur, 
              offsetY: vm.fontEditData.shadow.blur, 
              blur: vm.fontEditData.shadow.blur
            })
          } else {
            vm.fontEditData[name] = e.target.value
            curText.set(name, vm.fontEditData[name])
          }
      }
      curObj.renderAll()
    },
    addBorder(data, curText, curObj, e) {
      var vm = this
      switch (e.target.value) {
        case '无':
          curObj.remove(vm.curBorder)
          break
        case '方框1':
          curObj.remove(vm.curBorder)
          var rect = new fabric.Rect({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            width: curText.width * curText.scaleX + 5,
            height: curText.height * curText.scaleY * curText.scaleY + 5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
          })
          /*rect.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: rect.width,
            y2: 0,
            colorStops: {
              0: "red",
              1: "blue"
            }
          })*/
          curObj.add(rect)
          vm.curBorder = rect
          break
        case '方框2':
          curObj.remove(vm.curBorder)
          var rect = new fabric.Rect({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            width: curText.width * curText.scaleX + 5,
            height: curText.height * curText.scaleY + 5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
            strokeDashArray: [5, 5],
          })
          curObj.add(rect)
          vm.curBorder = rect
          break
        case '方框3':
          curObj.remove(vm.curBorder)
          var rect = new fabric.Rect({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            width: curText.width * curText.scaleX + 5,
            height: curText.height * curText.scaleY + 5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
            strokeDashArray: [2, 4, 6],
          })
          curObj.add(rect)
          vm.curBorder = rect
          break
        case '圆1':
          curObj.remove(vm.curBorder)
          var circle = new fabric.Circle({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            radius: curText.width * curText.scaleX * 0.5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
            // strokeDashArray: [2, 4, 6],
          })
          curObj.add(circle)
          vm.curBorder = circle
          break
        case '圆2':
          curObj.remove(vm.curBorder)
          var circle = new fabric.Circle({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            radius: curText.width * curText.scaleX * 0.5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
            strokeDashArray: [2, 4, 6],
          })
          curObj.add(circle)
          vm.curBorder = circle
          break
        case '椭圆1':
          curObj.remove(vm.curBorder)
          var circle = new fabric.Circle({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            radius: curText.width * curText.scaleX * 0.5,
            scaleY: 0.5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
          })
          curObj.add(circle)
          vm.curBorder = circle
          break
        case '椭圆2':
          curObj.remove(vm.curBorder)
          var circle = new fabric.Circle({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            radius: curText.width * curText.scaleX * 0.5,
            scaleY: 0.5,
            fill: 'rgba(0,0,0,0)',
            stroke: data.color,
            strokeWidth: data.width,
            strokeDashArray: [2, 4, 6],
          })
          curObj.add(circle)
          vm.curBorder = circle
          break
        case '三角形':
          curObj.remove(vm.curBorder)
          var triangle = new fabric.Triangle({
            name: '边框',
            originX: curText.originX,
            originY: curText.originY,
            top: curText.top,
            left: curText.left,
            angle: curText.angle,
            width: curText.width * curText.scaleX * 2, 
            height: curText.width * curText.scaleX * 2, 
            fill: 'rgba(0,0,0,0)', 
            stroke: data.color,
            strokeWidth: data.width,
            // strokeDashArray: [2, 4, 6]
          })
          curObj.add(triangle)
          vm.curBorder = triangle
          break
        case '五角形':
          curObj.remove(vm.curBorder)
          console.log('五角形')
          break
        case '六角形':
          curObj.remove(vm.curBorder)
          console.log('六角形')
          break
      }
    },
    changeBorderStyle(name, curBorder, curObj, e) {
      curBorder.set(name, e.target.value)
      curObj.renderAll()
    },
    removeObj(obj) {  // 编辑文字--删除
      var vm = this
      vm.curObj.remove(obj)
      vm.curText = ''
      vm.curImg = ''
      vm.curBorder = ''
    },
    layoutRender() { // 改变 canvasIn 样式
      var vm = this
      ;[].slice.call($('.canvasIn-box').children()).forEach(function(canvas, id) {
        /*vm.layoutData.forEach(function(item, idx) {
          if(id === idx) {
            $(canvas).css({
              'position': 'absolute',
              'top': item.top + 'px',
              'left': item.left + 'px',
              'width': item.width + 'px',
              'height': item.height + 'px',
              'border': item.border,
              'border-radius': item.borderRadius + 'px',
              'background': 'rgb(229,229,229) url(/static/img/edit/dragTip.png) no-repeat center / contain',
            })
          }
        })*/
      })
    },
    stopParentEvent(e) {
      e.stopPropagation() // 阻止事件冒泡而触发父级的click事件
    },
    addImg(dragImg, idx) {
      var vm = this
      vm.isAddtext = false
      vm.curObj.discardActiveObject()
      if(idx < 0) {
        return
      }
      var clipPoly = vm.canvasInObj[idx]
      var pugImg = new Image();
      pugImg.onload = function (img) {    
          var scaleNum = 1
          var pug = new fabric.Image(pugImg, {
              originX: 'left',
              originY: 'top',
              hasControls: true, // 隐藏控件
              // hasBorders: false, // 隐藏框centeredScaling
              // centeredScaling: true, 
              clipTo: function(ctx) {
                  var ctxLeft = -( pug.width / 2 );
                  var ctxTop = -( pug.height / 2 );

                  ctx.rect(
                    clipPoly.left - pug.left - pug.width / 2 + 6,
                    clipPoly.top - pug.top - pug.height / 2 + 6,
                    clipPoly.width - 12,
                    clipPoly.height - 12
                  );
                  // ctx.rotate(degToRad(0))
                  ctx.translate(ctxLeft + pug.width / 2, ctxTop + pug.height / 2)
                  ctx.scale(scaleNum, scaleNum)
                  
              }
          });
          var ratio = pugImg.height / pugImg.width
          var w
          var h
          if(ratio >= 1) {
            w = clipPoly.width
            h = clipPoly.width * ratio
          } else {
            h = clipPoly.height
            w = h / ratio
          }
          pug.set({
            'width': w - 12,
            'height': h - 12
          })
          // 取消旋转控件
          pug.hasRotatingPoint = false
          pug.set({
            'left': clipPoly.strokeWidth + clipPoly.left/* - pug.width / 4 - pug.left*/,
            'top': clipPoly.strokeWidth + clipPoly.top/* - pug.height / 4 - pug.top*/,
          })
          vm.curObj.add(pug);
          vm.curObj.renderAll()
          vm.curObj.bringToFront(pug); // 一路向上
      };
      dragImg ? pugImg.src = dragImg.src : pugImg.src = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2871764249,1040041727&fm=27&gp=0.jpg';
      vm.curObj.renderAll()
    },
    drag(e) { // @dragstart: 在用户开始拖动元素时执行
      console.log('drag')
      var vm = this
      vm.curDragImg = e.target
    },
    allowDrop(e) { // @dragover: 在元素正在拖动到放置目标时触发
      e.preventDefault()
      var vm = this
      console.log('allowDrop')
      // target.preventDefault()

    },
    drop(e) { // @drop: 在元素拖动到放置目标后触发
      e.preventDefault()
      var vm = this
      console.log('drop')
      vm.addImg(vm.curDragImg, vm.curCanvasInIdx)
    },
    changeObj(canvasId, e) {
      e.preventDefault()
      $('#canvasIn0').css({
        'box-shadow': '0 0 10px 2px rgba(0, 0, 0, 0) inset'
      })
      var vm = this
      // console.log(vm.canvasInObj)
    },
    addPics(e) { // 添加照片
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
      var vm = this
      fabric.Image.fromURL(bgImg, function(img) {
        img.name = 'canvasOutBg'
        obj.backgroundImage = img;
        obj.backgroundImage.width = obj.width;
        obj.backgroundImage.height = obj.height
        obj.add(img).renderAll();
        vm.curBgImg = img
        obj.sendToBack(img)
        // obj.sendBackwards(img)
        img.selectable = false
      })
    }
  },
  mounted() {
    var vm = this
    vm.$nextTick(function() { // dom已更新
      var canvas = new fabric.Canvas('canvasOut')
      vm.curObj = canvas
      canvas.setWidth(720)
      canvas.setHeight(canvas.width * 420 / 720)
      vm.changeBg('/static/img/edit/bg.png', canvas)
      vm.curObj.on('after:render', function(options) {
        var gobj = vm.curObj.getActiveObject(); //获取当前选中对象
        if(gobj) {
          if(gobj.type ==='text') {
            vm.isAddtext = true
            vm.curText = vm.curObj.getActiveObject()
          }
          if(('name' in gobj) && gobj.name === '边框') {
            vm.isEditBorder = true
            vm.curBorder = vm.curObj.getActiveObject()
          }
          if(gobj.type === 'image') {
            vm.isAddimg = true
            vm.curImg = vm.curObj.getActiveObject()
          }
        } else {
          vm.curText = ''
          vm.curBorder = ''
          vm.curImg = ''
          vm.isAddtext = false
          vm.isAddimg = false
          vm.isEditBorder = false
        }

        
        // 图片编辑框定位
        /*if(vm.isAddimg && vm.curCanvasInIdx > -1) {
          var canvasIn = vm.canvasInObj[vm.curCanvasInIdx]
          $('.img-edit').css({
            top: canvasIn.top + 'px',
            left: canvasIn.left + canvasIn.width + 10 + 'px',
          })
        }*/
      })
      if(!vm.isAddtext) {
        vm.curObj.discardActiveObject()
        vm.curObj.renderAll()
      }

      // 仿hover效果
      vm.curObj.on('mouse:over', function(options) {
        /*var p = canvas.getPointer(options.e)
        console.log(p)*/
        // console.log('over', e.target.name)

        if(options.target) {
          if(!('name' in options.target)) {
            return
          } else if(options.target.name.indexOf('canvasIn') > -1) {
            vm.curCanvasInIdx = options.target.name.replace('canvasIn', '') * 1
          }
        }
        // options.target.set('stroke', '#ff7800')
        // vm.curObj.renderAll()
      })
      /*vm.curObj.on('mouse:out', function(options) {
        var p = canvas.getPointer(options.e)
        console.log(p)
        // console.log('out', options.target.name)
        // options.target.set('stroke', '#fff')
        // vm.curObj.renderAll()
      })*/

      // 获取第一条数据赋值layoutData
      vm.$axios.post('/api/layoutData')
      .then((res) => {
        vm.layoutData = res.data[0].canvasBox
      }) 

    }) // $nextTick

    
  },
  updated() { // DOM 更新后执行
    var vm = this
    vm.$nextTick(function () {
      // vm.layoutRender()

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"

.edit
  user-select none
  margin-top 16px
  .edit-list
    position absolute
    top 40px
    bottom 0px
    // height 690px
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
          img
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
    // height 690px
    min-width 1100px
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
    top 11.63%
    // right 180px
    // left 180px
    width 720px
    height 420px
    left 50%
    margin-left -360px
    display flex
    justify-content center
    text-align center
    border 8px solid #eee
    // #canvasOut
    //   box-sizing border-box
    .addtext-box
      position absolute
      left 135px
      top 10px
      -padding 20px 15px
      border 1px solid #3385ff
      // display none
      .addtext 
        background transparent
        border 1px dashed #aaa
        padding 5px
      >a
        width 20px
        height 20px
        line-height 19px
        border-radius 50%
        background #3385ff
        position absolute
        top -10px
        right -10px
        bottom auto
        text-align center
        &.reset-btn
          top 20px
        &.replace-btn
          left -10px
          display none
        img
          margin-top 2px
    .font-edit
      // display none
      width 500px
      background rgb(250, 250, 250)
      position absolute
      top 160px
      left 200px
      padding 8px 10px 12px
      border 1px solid rgb(170, 170, 170)
      -display none
      z-index 50
      cursor move
      .close
        float right
        cursor pointer
        &:hover
          color red
      >li
        border-bottom 1px solid rgb(200, 200, 200)
        padding 15px 0
        user-select none
        span
          &:hover
            color rgb(58, 170, 146)
          &.removeImg
            &:hover
              color red
        &:last-child
          border-bottom 1px solid transparent
          padding-bottom 0
        >select
          height 35px
          line-height 35px
          margin-right 20px
          padding 8px
          vertical-align middle
        .selectFontFamily
          font-family STXingkai
        >span
          margin-right 10px
          cursor pointer
          img
            vertical-align middle
            width 20px
        &.controls
          span
            display inline-block
            margin-right 27px
            &:last-child
              margin-right 0
            img
              vertical-align middle
        &:last-child
          position relative
          input[type="color"]
            width 22px
          >div
            text-align left
            padding 0 10px
          .left
            width 348px
            >div
              margin-bottom 10px
              label
                font-weight 100
                margin-right 8px
              select
                display inline-block
                vertical-align middle
                color #222
                margin-right 10px
                width 65px
                padding 2px
                &.selectFontFrame
                  width 101px
              input
                margin-right 10px
                vertical-align middle
          .right
            width 174px
            position absolute
            top 15px
            right -30px
            span
                margin-bottom 15px
              input
                width 90px
                vertical-align middle
                cursor pointer
          >.bottom
            margin 12px 0
            span
              label
                font-weight 100
                margin-right 8px
              textarea
                vertical-align middle
              input
                display inline-block
                vertical-align middle
                margin-left 18px
                &.submit
                  // padding 5px 20px
                  // margin-left 30px
                  width 82px
                  height 35px
                  line-height 35px
                  color #fff
                  border 1px solid rgb(58, 170, 146)
                  border-radius 4px
                  background rgb(58, 170, 146)
                  &:hover
                    background rgb(43, 155, 131)
    .img-edit
      top 157px
      left 226px
      >li
        span
          label
            vertical-align middle
          input
            vertical-align middle
        &:last-child
          text-align left
          padding-bottom 5px
          span
            padding-left 30px
          .img-style
            >li
              display inline-block
              position relative
              padding 20px 0 8px 30px
              img
                width 80px
                height 80px
              p
                text-align center
                font-size 12px
              input
                padding-top 2px
                position absolute
                width 80px
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
      height 104px
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
              white-space nowrap  margin-top 
</style>
