// 导入express模块
const express = require('express')

// 导入router
const router = require('./src/routers/router')

// 导入cros跨域请求
const cors = require('cors')

// 创建实例
const app = express()

// 挂在json数据格式解析
app.use(express.json())

// 加载cros跨域服务
app.use(cors())
app.use((req, res, next) => {
  //针对跨域进行配置，允许任何源访问
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// 挂载router中间件
app.use('', router)

// 开放静态资源,路由中不包括public文件夹中的内容,与路由可以保持共存
app.use(express.static('public'))

// 监听请求事件
app.listen(80, () => {
  console.log('express running at http://127.0.0.1')
})
