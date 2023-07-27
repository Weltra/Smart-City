const express = require('express')

// 创建router实例
const router = express.Router()

// 配置get数据接口
router.get('/get', (req, res) => {
  res.send({
    status: 0,
    msg: 'get请求成功',
    data: req.query,
  })
})

// 配置post数据接口

// 导出router路由文件
module.exports = router
