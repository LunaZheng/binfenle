# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

 ----------------------
|   Markdown 语法:     |  
 ----------------------  
（1）标题   
标题使用不同数量的"#"来标识是什么层级，可以对应于HTML里面的H1-H6，下面是示例代码和效果  
# this is H1
## this is H2
### this is H3
#### this is H4
##### this is H5
###### this is H6  
（2）图片  
```
 ![图片的替代文字](图片的网址)  
```
（3）强调  
```
*强调* 或者 _强调_  (示例：斜体)     
**加重强调** 或者 __加重强调__ (示例：粗体)    
***特别强调*** 或者 ___特别强调___ (示例：粗斜体)   
```
示例:  
**strong** or __strong__ ( Ctrl + B )
*emphasize* or _emphasize_ ( Ctrl + I )  
（4）代码  
使用反引号(esc键下面的按钮)将代码包裹起来  
（5）换行   
如果我们想把一行文本进行换行，我们可以在需要换行的地方输入至少两个空格，然后回车即可   
（6）引用   
如果我们在文章中引用了资料，那么我们可以通过一个右尖括号">"来表示这是一段引用内容   
示例:   
> 这是一级引用   
>> 这是二级引用    
（7）链接     
``` 
[链接文字](链接地址)
```

（8）列表标记  
```
有序:  
1. Ordered list item
2. Ordered list item
3. Ordered list item  
无序:  
* Unordered list item
* Unordered list item
* Unordered list item  
or :  
- Unordered list item
- Unordered list item
- Unordered list item
```
示例:    
有序:  
1. Ordered list item
2. Ordered list item
3. Ordered list item  
无序:  
* Unordered list item
* Unordered list item
* Unordered list item  
or :  
- Unordered list item
- Unordered list item
- Unordered list item

（9）分割线  
在单独一行里输入3个或以上的短横线、星号或者下划线实现    
示例:   
---   
***   
___



 ----------------------
|   vue-cli 项目步骤:  |  
 ----------------------
$ vue init webpack my-project  
$ cnpm install axios --save  
$ cnpm install vuex --save  
$ cnpm install stylus stylus-loader --save-dev  


 --------------------------
|   json server:使用方法   |
 --------------------------
安装:   
$ npm install json-server --save

```````````````````````````````````````````````````````````````````
// build\dev-server.js
const jsonServer = require('json-server')
const apiServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

apiServer.use(middlewares)
apiServer.use('/api', apiRouter)
apiServer.listen(port + 1, () => {
  console.log('JSON Server is running')
})

// config\index.js
proxyTable: {
    '/api/': 'http://localhost:8091/'
}
```````````````````````````````````````````````````````````````````
运行:   
$ npm run dev


 --------
|  bug:  |
 --------     
① 8080端口被本机占用, 改port为8090     
② build\dev-server.js 里 55行options报错 , 改 const 为 let     
③ 打包编译失败, 改 config\index.js --> build --> assetsPublicPath: '/' 为 assetsPublicPath: './'     
④ json server http://localhost:8091/ 显示数据路径错误 因为加了"/api"     
⑤ json server 只可以 get 请求      
  用 body-parser post/get 读取本地数据    

  安装:     
  $ cnpm i body-parser -S     

  在 build\dev-server.js 的 var app = express()后面加上以下代码就可以实现了
  ``````````````````````````````````````````````````````````````````````````
  var bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  var apiRouter = express.Router()
  var fs = require('fs')
  apiRouter.route('/:apiName')
  .all(function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
      if (err) throw err
      var data = JSON.parse(data)
      if (data[req.params.apiName]) {
        res.json(data[req.params.apiName])
      }
      else {
        res.send('no such api name')
      }

    })
  })

  app.use('/api', apiRouter);
  app.listen(port + 1, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:' + (port + 1) + '\n')
  })
  ``````````````````````````````````````````````````````````````````````````



 ---------------------
|  GitHub 代码更新 :  |
 ---------------------
   
步骤分别为添加、提交、推送     
git add 加要更新的文件(. 为所有文件)    
git commit -m "代码提交信息"    
git push origin master    