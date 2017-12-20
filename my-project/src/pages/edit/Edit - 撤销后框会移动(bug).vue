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
            <img :src="v.img" alt="" :title="v.title" 
              v-if="!(item.name === '图片' || item.name === '装饰')"
              @click="editListClick(item.name, i, $event)"
            >
            <img draggable="true" 
              :src="v.img" alt="" :title="v.title"
              v-if="item.name === '图片' || item.name === '装饰'"
              @mousedown="drag($event)"
            />
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
          <li class="undo" @click="undo">
            <a href="javascript:"><i class="icon-undo"></i>撤销</a>
          </li>
          <li class="redo" @click="redo">
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
                <input type="range" min="1" max="1500" value="500" class="img-scale" v-model="fontEditData.scale" @input="curText && changeSelect('scale', curText, curObj, $event)" @mouseup="updateModifications(true)">
              </span>
              <span class="img-edit-opacity">
                <label>透明</label>
                <input type="range" min="1" max="1000" value="1000" class="img-opacity" v-model="fontEditData.opacity" @input="curText && changeSelect('opacity', curText, curObj, $event)">
              </span>
            </div>
            <div class="bottom">
              <span class="font-edit-content">
                <label>文字</label>
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
              <input type="range" min="1" max="1500" value="500" class="img-scale" v-model="imgEditData.scale" @input="curImg && changeSelect('scale', curImg, curObj, $event)" @mouseup="updateModifications(true)">
            </span>
            <span class="img-edit-opacity">
              <label>透明</label>
              <input type="range" min="1" max="1000" value="1000" class="img-opacity" v-model="imgEditData.opacity" @input="curImg && changeSelect('opacity', curImg, curObj, $event)">
            </span>
          </li>
          <li class="controls">
            <span class="moveup" @click="changeFontStyle('top', curImg, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">上移
            </span>
            <span class="movedown" @click="changeFontStyle('top', curImg, curObj, '+')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/down.svg" alt="">下移
            </span>
            <span class="cutImg" @click="changeFontStyle('angle', curImg, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/copy.svg" alt="">旋转
            </span>
            <span class="copy" @click="changeFontStyle('clip', curImg, curObj)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/cut.svg" alt="">剪切
            </span>
            <span class="moveup" @click="changeFontStyle('bringToFront', curImg, curObj, '-')" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/up.svg" alt="">前置
            </span>
            <span class="removeImg" @click="removeObj(curImg)" @mouseenter="hoverInColor" @mouseleave="hoverOutColor">
              <img src="/static/img/edit/remove.svg" alt="">删除
            </span>
          </li>
          <li class="controls">
            <span>图片调整</span>
            <ul class="img-style">
              <li 
                v-for="(item, idx) in imgAdjustList" 
                @click="!item.isInputShow && changeFontStyle(item.tag, curImg, curObj)"
              >
                <img :src="'/static/img/edit/' + item.name + '.png'" :title="item.tag" alt="">
                <p :title="item.tag">{{item.tag}}</p>
                <input v-if="item.isInputShow && item.tag != 'Pixelate'" type="range" min="-300" max="500" value="0" class="Saturate" @input="item.isInputShow && changeFontStyle(item.tag, curImg, curObj, $event)">
                <input v-if="item.tag === 'Pixelate'" type="range" min="0" max="20" value="0" @input="item.isInputShow && changeFontStyle(item.tag, curImg, curObj, $event)">
                <!-- <div v-if="item.tag === 'Pixelate'" class="pixelate-box">
                  <label for="小">小:<input type="radio" name="Pixelate" id="小" value="小" @click="item.isInputShow && changeFontStyle(item.tag, curImg, curObj, 4)"></label>
                  <label for="中">中:<input type="radio" name="Pixelate" id="中" value="中" @click="item.isInputShow && changeFontStyle(item.tag, curImg, curObj, 8)"></label>
                  <label for="大">大:<input type="radio" name="Pixelate" id="大" value="大" @click="item.isInputShow && changeFontStyle(item.tag, curImg, curObj, 12)"></label>
                </div> -->
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
            <span class="totalPage">共计{{isShowPage ? filePageData.length : filePicData.length}} 张{{isShowPage ? '页面' : '图片'}}</span>
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
          <i class="btn icon-prev" @click="prevPic"></i>
          <i class="btn icon-next" @click="nextPic"></i>
          <div class="img-list">
            <ul id="ul1">
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
    <v-cut v-if="cutImgData.isCutImg" :cutImgData="cutImgData" @clip-save="getClipSave"></v-cut>
  </div>
</template>

<script>
import cut from '../../components/cut.vue'

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
  components: {
    'v-cut': cut
  },
  data () {
    return {
      curObj: '', // 当前canvas对象
      curText: '', // 当前文字对象
      curShowListIdx: -1,
      curChangeIconIdx: -1,
      curDragImg: '',
      // curCanvasInIdx: -1,
      filePicData: [],
      isAddtext: false,
      isEditBorder: false,
      curBgImg: '/static/img/edit/bg.png',
      curBorder: '',
      isAddimg: false,
      curImg: '',
      cutImgData: {
        isCutImg: false,
        cutImg: '',
      },
      // imgEditData: {},
      borderData: {
        width: 1,
        color: '#ff0000'
      },
      imgAdjustList: [ // 图片编辑框-图片调整内容
        {
          name: '基本调整',
          tag: 'Saturate',
          isInputShow: true,
        }, {
          name: '黑白',
          tag: 'Grayscale',
          isInputShow: false,
        }, {
          name: '旧照片',
          tag: 'Sepia2',
          isInputShow: false,
        }, {
          name: '素描',
          tag: 'Pixelate',
          isInputShow: true,
        }, {
          name: '柔化',
          tag: 'Sepia',
          isInputShow: false,
        }, {
          name: '锐化',
          tag: 'Convolute-sharpen',
          isInputShow: false,
        }, {
          name: '色彩叠加',
          tag: 'Convolute-blur',
          isInputShow: false,
        }, {
          name: '色彩优化',
          tag: 'Convolute-Emboss',
          isInputShow: false,
        },{
          name: '旧照片',
          tag: 'Convolute-EmbossOpaqueness',
          isInputShow: false,
        }, {
          name: '黑白',
          tag: 'GradientTransparency',
          isInputShow: true,
        }, {
          name: '旧照片',
          tag: 'Invert',
          isInputShow: false,
        }, {
          name: '素描',
          tag: 'Noise',
          isInputShow: true,
        }, {
          name: '柔化',
          tag: 'Contrast',
          isInputShow: true,
        }, {
          name: '锐化',
          tag: 'Brightness',
          isInputShow: true,
        }, {
          name: '色彩叠加',
          tag: 'RemoveWhite',
          isInputShow: false,
        }, {
          name: '色彩优化',
          tag: 'Tint',
          isInputShow: false,
        },{
          name: '旧照片',
          tag: 'Multiply',
          isInputShow: false,
        }, {
          name: '柔化',
          tag: 'ColorMatrix',
          isInputShow: false,
        }, {
          name: '色彩优化',
          tag: 'Blend1',
          isInputShow: false,
        },{
          name: '旧照片',
          tag: 'Blend2',
          isInputShow: false,
        },
        /*{
          name: '柔化',
          tag: 'Resize',
          isInputShow: false,
        }*/
      ],

      // 文字编辑记录
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

      // 图片编辑记录
      imgEditData: {
        opacity: 1000,
        scale: 500
      },
      canvasOut: '',
      layoutData: [ // 布局初始样式
      ],
      canvasInObj: [],
      canvasInRectObj: [],
      canvasInItemObjs: [],
      filePageData: [ // 页面内容
        {
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
        }
      ],
      isShowPage: false,
      editList: [ // 左侧编辑列表内容
        {
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
        }
      ],
      // 撤销
      state: [],
      mods: 0,
    }
  },
  computed: {
    curState() { // 撤销/恢复当前状态值
      var vm = this
      return vm.state.length - 1 - vm.mods - 1
    }
  },
  watch: {
    curState(newVal) { // 撤销/恢复样式变化
      var vm = this
      console.log(newVal)
      // if(newVal <= 1) {
      if(newVal <= -1) {
        $('li.undo a').css({
          'color': '#aaa',
          'cursor': 'not-allowed'
        })
        $('li.undo i').css({
          'color': '#aaa',
          'cursor': 'not-allowed'
        })
        $('li.undo').hover(function() {
          $('li.undo a').css('color', '#aaa')
          $('li.undo i').css('color', '#aaa')
        }, function() {
          $('li.undo a').css('color', '#aaa')
          $('li.undo i').css('color', '#aaa')
        })
      } else {
        $('li.undo a').css({
          'color': '#333',
          'cursor': 'pointer'
        })
        $('li.undo i').css({
          'color': '#aaa',
          'cursor': 'pointer'
        })
        $('li.undo').hover(function() {
          $('li.undo a').css('color', '#3aaa92')
          $('li.undo i').css('color', '#3aaa92')
        }, function() {
          $('li.undo a').css('color', '#333')
          $('li.undo i').css('color', '#aaa')
        })
      }
      if(newVal === (vm.state.length - 2)) {
        $('li.redo a').css({
          'color': '#aaa',
          'cursor': 'not-allowed'
        })
        $('li.redo i').css({
          'color': '#aaa',
          'cursor': 'not-allowed'
        })
        $('li.redo').hover(function() {
          $('li.redo a').css('color', '#aaa')
          $('li.redo i').css('color', '#aaa')
        }, function() {
          $('li.redo a').css('color', '#aaa')
          $('li.redo i').css('color', '#aaa')
        })
      } else {
        $('li.redo a').css({
          'color': '#333',
          'cursor': 'pointer'
        })
        $('li.redo i').css({
          'color': '#aaa',
          'cursor': 'pointer'
        })
        $('li.redo').hover(function() {
          $('li.redo a').css('color', '#3aaa92')
          $('li.redo i').css('color', '#3aaa92')
        }, function() {
          $('li.redo a').css('color', '#333')
          $('li.redo i').css('color', '#aaa')
        })
      }
    },
    isAddtext(newVal) {
      var vm = this
      if(!newVal) {
        vm.curObj.discardActiveObject()
        vm.curObj.renderAll()
      }
    },
    isAddimg(newVal) {
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
    curImg(newVal) {
      var vm = this
      if(newVal) {
        vm.imgEditData.opacity = newVal.opacity * 1000,
        vm.imgEditData.scale = newVal.scaleX * 500
      }
    },
    layoutData: {　　　　
      handler(newVal, oldVal) {
        var vm = this
        var objs = []
        var rectObjs= []
        newVal.forEach(function(item, idx) {
          var rect = new fabric.Rect({
            width: item.width + item.space,
            height: item.height + item.space,
            top: item.top - item.space,
            left: item.left - item.space,
            // width: item.width + item.space + item.space,
            // height: item.height + item.space + item.space,
            angle: item.angle,
            fill: 'transparent',
            // fill: '#fff',
            stroke: '#fff',
            strokeWidth: item.space,
            selectable: false,
          })
          vm.curObj.add(rect)
          // vm.updateModifications(true) // add记录 添加框
          rectObjs.push(rect)
          // rect.selectable = false
          vm.curObj.renderAll()

          var imgElement = new Image()
          imgElement.src = '/static/img/edit/dragTip.png'
          var imgInstance = new fabric.Image(imgElement, {
            top: item.top,
            left: item.left,
            angle: item.angle,
            width: item.width,
            height: item.height,
            selectable: false,
            // stroke: item.stroke,
            // strokeWidth: item.strokeWidth,
            // stroke: '#f00',
            // strokeWidth: 1,
          })
          vm.curObj.add(imgInstance)
          objs.push(imgInstance)
          // imgInstance.selectable = false
          /*var group = new fabric.Group([rect, imgInstance], {
            name: 'canvasIn' + idx,
            // stroke: '#ff7800',
            // strokeWidth: 6*0.5,
          })
          vm.curObj.add(group)
          objs.push(group)
          group.selectable = false*/
          vm.curObj.renderAll()
        })　　
        vm.canvasInObj = objs
        vm.canvasInRectObj = rectObjs
        /*if(newVal) {
          vm.updateModifications(true) // add记录 添加框
        }*/
      },
      deep: true　　
    },
    curBgImg(newVal, oldVal) {
      var vm = this
      vm.curObj.remove(oldVal)
    },
    canvasInObj(newVal, oldVal) {
      var vm = this
      if(oldVal) {
        vm.canvasInItemObjs.forEach(function(item, idx) {
          vm.curObj.remove(item)
        })
        oldVal.forEach(function(item, idx) {
          vm.curObj.remove(item)
        })　　
      }
    },
    canvasInRectObj(newVal, oldVal) {
      var vm = this
      if(oldVal) {
        oldVal.forEach(function(item, idx) {
          vm.curObj.remove(item)
        })　　
      }
    },
    /*curCanvasInIdx(newVal, oldVal) {
      var vm = this
      console.log(newVal, oldVal)
    },*/
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
      vm.updateModifications(true) // add记录  初始
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
      obj.add(text)
      vm.updateModifications(true) // add记录
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
      if(curText.type === 'text') {
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
      } else if(curText.type === 'image' || curText.type === 'group') {
        var curImg = curText
        var imgBox = ''
        if(curText.type === 'group') {
          if(curText._objects[0].type === 'image') {
            curImg = curText._objects[0]
            console.log(curImg)
            if(curText._objects[1]) {
              imgBox = curText._objects[1]
            }
          }
        }
        switch (name) {
          case 'top':
            value === '-' ? curImg.set(name, curImg.top - 5) : curImg.set(name, curImg.top + 5)
            if(imgBox) {
              value === '-' ? imgBox.set(name, imgBox.top - 5) : imgBox.set(name, imgBox.top + 5)
            }
            break
          case 'angle':
            // vm.imgEditData.angle += 45
            // curImg.set('angle', vm.imgEditData.angle)
            curImg.set(name, curImg.angle + 45)
            break
          case 'clip':
            vm.cutImgData.cutImg = vm.curObj.getActiveObject()
            vm.cutImgData.isCutImg = true
            vm.isAddimg = false
            vm.curObj.discardActiveObject()
            break
          case 'bringToFront': // 前置
            curObj.bringToFront(curImg)
            break
          case 'Saturate': // 饱和度
            var val = value.target.value
            var filter = new fabric.Image.filters.Saturate({
              saturate: parseFloat(val)
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Grayscale': // 黑白
            curImg.filters = []
            curImg.filters.push(new fabric.Image.filters.Grayscale())
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Sepia2': // 旧照片/棕褐色
            curImg.filters.push(new fabric.Image.filters.Sepia2())
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Pixelate': // 像素化-素描
            var val = value.target.value
            // curImg.filters.push(new fabric.Image.filters.Brownie())
            curImg.filters.push(new fabric.Image.filters.Pixelate({
              blocksize: parseFloat(val, val)
            }))
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Sepia': // 旧照片/棕褐色
            curImg.filters.push(new fabric.Image.filters.Sepia())
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Convolute-sharpen': // 
            var filter = new fabric.Image.filters.Convolute({
              matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
            });
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Convolute-blur': // 
            var filter = new fabric.Image.filters.Convolute({ // blur
                matrix: [ 1/9, 1/9, 1/9,
                          1/9, 1/9, 1/9,
                          1/9, 1/9, 1/9 ]
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Convolute-Emboss': // 
            var filter = new fabric.Image.filters.Convolute({ // Emboss 浮雕
                matrix: [ 1,   1,  1,
                          1, 0.7, -1,
                         -1,  -1, -1 ]
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Convolute-EmbossOpaqueness': // 
            var filter = new fabric.Image.filters.Convolute({ // Emboss opaqueness
              opaque: true,                                   // 浮雕过滤器与不透明
              matrix: [ 1,   1,  1,
                        1, 0.7, -1,
                       -1,  -1, -1 ]
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'GradientTransparency': // 渐变透明
            // var val = value.target.value
            var val = value.target.value
            var filter = new fabric.Image.filters.GradientTransparency({
                threshold: parseFloat(val)
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Invert': // 倒置(底片)
            var filter = new fabric.Image.filters.Invert()
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Noise': // 噪声
            var val = value.target.value
            var filter = new fabric.Image.filters.Noise({
                noise: parseFloat(val)
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Contrast': // 对比
            var val = value.target.value
            var filter = new fabric.Image.filters.Contrast({
                contrast: parseFloat(val)
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Brightness': // 亮度
            var val = value.target.value
            var filter = new fabric.Image.filters.Brightness({
                brightness: parseFloat(val)
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'RemoveWhite': // 白色==>变透明
            var filter = new fabric.Image.filters.RemoveWhite({
                threshold: 40,
                distance: 140
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Tint':
            var filter = new fabric.Image.filters.Tint({
                color: 'rgba(53, 21, 176, 0.5)'
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Multiply':
            var filter = new fabric.Image.filters.Multiply({
               color: 'rgb(53, 21, 176)'
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Blend1': // 混合
            var filter = new fabric.Image.filters.Blend({
                image: curImg,
                color: '#000',
                mode: 'multiply'
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          case 'Blend2': // 混合
            var filter = new fabric.Image.filters.Blend({
                image: curImg,
                mode: 'multiply',
                alpha: 0.5
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
          /*case 'Resize':
            var filter = new fabric.Image.filters.Resize()
            curImg.filters.push(filter)
            // curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break*/
          case 'ColorMatrix':
            var filter = new fabric.Image.filters.ColorMatrix({
                matrix: [
                 1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502,
                 -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203,
                 -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946,
                 0, 0, 0, 1, 0
                ]
            })
            curImg.filters.push(filter)
            curImg.filters = curImg.filters.slice(-1)
            curImg.applyFilters(curObj.renderAll.bind(curObj))
            break
        }
        curObj.renderAll()
      }
    },
    toFilter(name, curImg, curObj, e) {
      console.log(curImg)
      var val = e.target.value
      var filter = new fabric.Image.filters.Brightness({Brightness: val})
      curImg.filters.push(filter)
      // curImg.filters = curImg.filters.slice(-1)
      curImg.applyFilters()
      curObj.renderAll()
    },
    applyFilter(index, filter) {
      var vm = this
      var obj = vm.curImg
      obj.filters[index] = filter
      obj.applyFilters()
      vm.curObj.renderAll()
    },
    toGrayscaleDown(curImg, curObj, e) {
      var vm = this
      var f = fabric.Image.filters
      // e.preventDefault()
      // e.stopPropagation()
      curImg.filters.push(new f.Grayscale())
      curImg.applyFilters()
      curObj.renderAll()
    },
    toGrayscaleUp(curImg, curObj, e) {
      var vm = this
      var f = fabric.Image.filters
      // e.preventDefault()
      // e.stopPropagation()
      curImg.filters.push(new f.Grayscale())
      curImg.applyFilters()
      curObj.renderAll()
    },
    toGrayscale(curImg, curObj, e) {
      var vm = this
      var f = fabric.Image.filters
      // e.preventDefault()
      // e.stopPropagation()
      curImg.filters.push(new f.Grayscale())
      curImg.applyFilters()
      curObj.renderAll()
      // vm.applyFilter(0, this.checked && new f.Grayscale())
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
        case 'scale':
          if(curText.type === 'text') {
            vm.fontEditData.scale = e.target.value
            curText.scale(vm.fontEditData.scale * 0.002)
          } else if(curText.type === 'image') {
            var curImg = curText
            var val = (e.target.value * 0.002).toFixed(2)
            curImg.scale(val)
          }
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
          if(curText.type === 'text') {
            vm.fontEditData.opacity = e.target.value
            curText.set('opacity', vm.fontEditData.opacity * 0.001)
          } else if(curText.type === 'image') {
            var curImg = curText
            curImg.set('opacity', e.target.value * 0.001)
          }
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
          vm.updateModifications(true) // add记录
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
    stopParentEvent(e) {
      e.stopPropagation() // 阻止事件冒泡而触发父级的click事件
    },
    clipByName(ctx, img, clipObj) {
      var vm = this
      var o = {}
      //  You might need to call `setCoords` on an object after centering, to update controls area (您可能需要在对象centering之后调用对象的setCoords来更新控件区域)
      img.setCoords();
      var scaleXTo1 = (1 / img.scaleX);
      var scaleYTo1 = (1 / img.scaleY);
      ctx.save();

      var ctxWidth = clipObj.width - clipObj.strokeWidth;
      var ctxHeight = clipObj.height - clipObj.strokeWidth;
      var ctxLeft = -(img.width / 2) + clipObj.strokeWidth;
      var ctxTop = -(img.height / 2) + clipObj.strokeWidth;

      ctx.translate(ctxLeft, ctxTop);
      ctx.scale(scaleXTo1, scaleYTo1);
      ctx.rotate(vm.degToRad(img.angle * -1));

      ctx.beginPath();

      // Polygon多边形
      // instanceof --> clipObj在不在 fabric.Polygon 构造函数中, 返回布尔值
      var isPolygon = clipObj instanceof fabric.Polygon; 
      // polygon cliping area
      if (isPolygon) {
        ctx.translate(
          - clipObj.left - ctxWidth / 2 - clipObj.strokeWidth, 
          - clipObj.top - ctxHeight / 2 - clipObj.strokeWidth
        );
        // prepare(准备) points of polygon
        var points = [];
        for (i in clipObj.points)
          points.push({
            x: (clipObj.left + clipObj.width / 2) + clipObj.points[i].x - img.oCoords.tl.x,
            y: (clipObj.top + clipObj.height / 2) + clipObj.points[i].y - img.oCoords.tl.y
          });

        ctx.moveTo(points[0].x, points[0].y);
        for (i = 1; i < points.length; ++i) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);

        ctx.closePath();

        ctx.restore();

        o = {
          points: points,
          translate01: {x: ctxLeft, y: ctxTop},
          translate02: {
            x: - clipObj.left - ctxWidth / 2 - clipObj.strokeWidth, 
            y: - clipObj.top - ctxHeight / 2 - clipObj.strokeWidth
          },
          scale: {x: scaleXTo1, y: scaleYTo1},
          rotate: img.angle,
        }
        return o
      }
      // rectangle cliping area
      else {
        ctx.rect(
          clipObj.left - img.oCoords.tl.x,
          clipObj.top - img.oCoords.tl.y,
          clipObj.width,
          clipObj.height
        );
        ctx.closePath();

        ctx.restore();

        o = {
          left: clipObj.left - img.oCoords.tl.x,
          top: clipObj.top - img.oCoords.tl.y,
          width: clipObj.width,
          height: clipObj.height,
          translate: {x: ctxLeft, y: ctxTop},
          scale: {x: scaleXTo1, y: scaleYTo1},
          rotate: img.angle,
        }
        return o
      }
    },
    /*clipByName(img, clipObj) {
      var vm = this
      var o = {}
      img.setCoords();
      var scaleXTo1 = (1 / img.scaleX);
      var scaleYTo1 = (1 / img.scaleY);

      var ctxLeft = -(img.width / 2) + clipObj.strokeWidth;
      var ctxTop = -(img.height / 2) + clipObj.strokeWidth;

      o = {
        left: clipObj.left - img.oCoords.tl.x,
        top: clipObj.top - img.oCoords.tl.y,
        width: clipObj.width,
        height: clipObj.height,
        translate: {x: ctxLeft, y: ctxTop},
        scale: {x: scaleXTo1, y: scaleYTo1},
        rotate: img.angle,
      }
      return o
    },*/
    addImg(dragImg, idx) {
      var vm = this
      vm.isAddtext = false
      vm.curObj.discardActiveObject()
      if(idx < 0) {
        return
      }
      var clipPoly = vm.canvasInObj[idx]
      var pugImg = new Image()
      pugImg.onload = function (img) {    
          var scaleNum = 1
          var pug = new fabric.Image(pugImg, {
              originX: 'center',
              originY: 'center',
              curCanvasInObj: clipPoly,
              // hasControls: false, // 隐藏控件
              // hasBorders: false, // 隐藏框centeredScaling
              // centeredScaling: true, 
              clipTo: function(ctx) {
                pug.clipRecord = vm.clipByName(ctx, pug, clipPoly)
              }
          });

          // 拖拽图片后使其自适应框的大小
          var ratio = pugImg.height / pugImg.width
          var w
          var h
          if(ratio >= 1) {
            w = clipPoly.width - clipPoly.strokeWidth
            h = clipPoly.width * ratio
          } else {
            h = clipPoly.height - clipPoly.strokeWidth
            w = h / ratio
          }
          pug.set({
            'width': w,
            'height': h
          })
          // pug.hasRotatingPoint = false // 取消旋转控件
          pug.set({
            'left': clipPoly.left + clipPoly.width / 2 + clipPoly.strokeWidth * 0.5,
            'top': clipPoly.top + clipPoly.height / 2 + clipPoly.strokeWidth * 0.5,
          })
          vm.curObj.add(pug)
          vm.updateModifications(true) // add记录
          vm.canvasInItemObjs.push(pug)
          vm.curObj.renderAll()
          vm.curObj.bringToFront(pug); // 一路向上
      }
      dragImg ? pugImg.src = dragImg.src : pugImg.src = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2871764249,1040041727&fm=27&gp=0.jpg'
      vm.curObj.renderAll()
    },
    degToRad(degrees) {
      return degrees * (Math.PI / 180);
    },
    drag(e) { // @dragstart: 在用户开始拖动元素时执行
      var vm = this
      vm.curDragImg = e.target
    },
    allowDrop(e) { // @dragover: 在元素正在拖动到放置目标时触发
      e.preventDefault()
      var vm = this
    },
    drop(e) { // @drop: 在元素拖动到放置目标后触发
      e.preventDefault()
      var vm = this
      var x = e.offsetX
      var y = e.offsetY
      vm.canvasInObj.forEach(function(item, idx) {
        var l = item.left
        var t = item.top
        var r = l + item.width
        var b = t + item.height
        if(x >= l && y >= t && x <= r && y <= b) {
          vm.addImg(vm.curDragImg, idx)
        } else {
          console.log('没拖到框内')
        }
      })
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
        if(bgImg != '/static/img/edit/bg.png') {
          vm.updateModifications(true) // add记录
        }
        vm.curBgImg = img
        obj.sendToBack(img)
        // obj.sendBackwards(img)
        img.selectable = false
      })
    },
    prevPic(e) {
      var vm = this
      var picBox = $(e.target.closest('.pic-box'))
      var ul = $(picBox.children()[2].children)
      var pics = ul.children()
      if(pics.length > 0) {
        var ulLeft = ul.css('left').replace('px', '')*1
        var moveLeft = $(pics[0]).width()*1 + 10
        ul.css('left', -(ulLeft + moveLeft) + 'px')
        console.log(moveLeft)
      } else {
        console.log('图片为空')
      }
      // console.log(vm.isShowPage)
    },
    nextPic(e) {
      var vm = this
      console.log('nextPic')
    },
    getClipSave(param) {  // param-->子组件传过来的参数
      var vm = this
      // console.log(param.toSVG())
      param.curCanvasInObj = vm.cutImgData.cutImg.curCanvasInObj
      var boxObj = vm.cutImgData.cutImg.curCanvasInObj

      // 待解决 004 : 裁剪后的定位
      param.set({
        'originX': 'center',
        'originY': 'center',
        'left': vm.cutImgData.cutImg.left/* - vm.cutImgData.cutImg.width / 2*/,
        'top': vm.cutImgData.cutImg.top /*- vm.cutImgData.cutImg.height / 2*/,
        // 'left': boxObj.left + boxObj.strokeWidth,
        // 'top': boxObj.top + boxObj.strokeWidth,
      })
      vm.removeObj(vm.cutImgData.cutImg)
      vm.curObj.add(param)
      vm.updateModifications(true) // add记录

      vm.canvasInItemObjs.push(param)
      vm.curObj.renderAll()
    },
    // 撤销 恢复 处理
    updateModifications(savehistory) { // 每当画布更新存储history
      var vm = this
      if (savehistory === true) {
        var myjson = JSON.stringify(vm.curObj)
        /*myjson.replace('"visible":true,', '"visible":true,"selectable":false,')
        console.log(myjson)*/
        vm.state.push(myjson)
        console.log('state数量' + vm.state.length)
      }
    },
    undo() { // 撤销
      var vm = this
      // if (vm.curState <= 1) {
      if (vm.curState <= -1) {
        return
      }
      if (vm.mods < vm.state.length) {
        vm.curObj.clear().renderAll()
        var arr = []
        var arrState = JSON.parse(vm.state[vm.curState])
        var backgroundImage = arrState.backgroundImage
        arrState.objects.forEach(function(item, idx) {
          // if(idx >= 3) {
          if(idx >= 1) {
            arr.push(JSON.stringify(item))
            vm.curObj.loadFromJSON('{"objects":[' + arr.join(',') + '],"backgroundImage":' + JSON.stringify(backgroundImage) + '}')
          }
          // if(idx >= 2) {
          if(idx >= 0) {
            vm.curObj.loadFromJSON('{"objects":[],"backgroundImage":' + JSON.stringify(backgroundImage) + '}')
          }
        })
        // console.log('撤销' + (vm.curState))
        vm.curObj.renderAll()
        vm.mods += 1
      }
    },
    redo() { // 恢复
      var vm = this
      if (vm.mods > 0) {
        vm.curObj.clear().renderAll()
        vm.curObj.loadFromJSON(vm.state[vm.curState + 2])
        // console.log('恢复' + (vm.curState + 2))
        vm.curObj.renderAll()
        vm.mods -= 1
      }
    },
  },
  mounted() {
    var vm = this
    vm.$nextTick(function() { // dom已更新
      var canvas = new fabric.Canvas('canvasOut')
      vm.curObj = canvas
      canvas.setWidth(720)
      canvas.setHeight(canvas.width * 420 / 720)
      vm.changeBg('/static/img/edit/bg.png', canvas)

        /*fabric.Image.fromURL('/static/img/edit/bg.png', function(img) {
              var img3 = img.set({ left: -250, top: -150 })
              canvas.add(img3)
            })*/
      
        
      vm.curObj.on('after:render', function(options) {
        /*var p = canvas.getPointer(options.e)
        console.log(p)*/
        /*var x = p.x
        var y = p.y
        vm.canvasInObj.forEach(function(item, idx) {
          var l = item.left
          var t = item.top
          var r = l + item.width
          var b = t + item.height
          if(x >= l && y >= t && x <= r && y <= b) {
            console.log('在canvasIn' + idx + '里')
          } else {
            console.log('在canvasIn外')
          }
        })*/
        // console.log(vm.curObj.getActiveObject()) // src: "http://localhost:8090/static/img/edit/bg.png"

        var gobj = vm.curObj.getActiveObject(); //获取当前选中对象
        if(gobj) {
          if(gobj.type ==='text') {
            vm.isAddtext = true
            vm.isAddimg = false
            vm.isEditBorder = false
            vm.curText = vm.curObj.getActiveObject()
          }
          if(('name' in gobj) && gobj.name === '边框') {
            vm.isEditBorder = true
            vm.isAddtext = false
            vm.isAddimg = false
            vm.curBorder = vm.curObj.getActiveObject()
          }
          if(gobj.type === 'image' || gobj.type === 'group') {
            vm.isAddimg = true
            vm.isAddtext = false
            vm.isEditBorder = false
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

      vm.curObj.on('object:modified', function () { // 修改
        console.log('modified')
        vm.updateModifications(true)
      })
      /*vm.curObj.on('object:added', function () { // 添加
        console.log('added')
        vm.updateModifications(true)
      })*/

      /*if(!vm.isAddtext) {
        vm.curObj.discardActiveObject()
        vm.curObj.renderAll()
      }*/

      // 仿hover效果
      /*vm.curObj.on('mouse:over', function(options) {
        // var p = canvas.getPointer(options.e)
        // console.log(p)
        options.target.set('stroke', '#ff7800')
        vm.curObj.renderAll()
      })
      vm.curObj.on('mouse:out', function(options) {
        options.target.set('stroke', '#fff')
        vm.curObj.renderAll()
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
  // user-select none
  margin-top 16px
  .edit-list
    position absolute
    top 40px
    bottom 0px
    min-height 688px
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
    min-height 688px
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
          &.undo
            a
              cursor not-allowed
              color #aaa
          &.redo
            a
              cursor not-allowed
              color #aaa
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
            cursor text
            padding-left 35px
            &:hover
              color #111
          .img-style
            height 245px
            overflow-y scroll
            >li
              display inline-block
              position relative
              margin 20px 0 8px 35px
              &:hover
                color rgb(58, 170, 146)
              img
                cursor pointer
                width 80px
                height 80px
              p
                cursor text
                text-align center
                font-size 12px
                width 80px
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
              input
                padding-top 2px
                position absolute
                width 80px
              .pixelate-box
                padding-top 5px
                position absolute
                font-size 12px
                label
                  display inline-block
                  width 24px
                input
                  width 12px
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
          position relative
          left 0px
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
