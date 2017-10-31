# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8090
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


 ---------------------
|  GitHub 代码更新 :  |
 ---------------------
   
步骤分别为添加、提交、推送     
git add 加要更新的文件(. 为所有文件)    
git commit -m "代码提交信息"    
git push origin master    


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

 -----------
|  待解决:  |
 -----------     
  1. 001:  小竖线的优化及收藏 ( src\components\bar-right.vue )
  2. 002:  让fabric字符串换行 ( src\pages\edit\Edit.vue )
           -->百度 :  JS 字符串换行
           --> http://www.cnblogs.com/ziyunfei/archive/2012/10/04/2711551.html