// 导入mockjs(加载模拟数据)
const mockjs = require('mockjs')

// 此处为后端访问接口的url，需要与前端页面保持一致
// 4.杭州车祸数据
const hangzhou_events = require('./Hangzhou_events.json')

const hangzhou_roads = require('./Hangzhou_roads.json')

const hangzhou_buildings = require('./Hangzhou_buildings.json')
// 导出函数
module.exports = () => {
  return mockjs.mock({
    // 导出url
    hangzhou_buildings,
    hangzhou_roads,
    hangzhou_events,
  })
}
