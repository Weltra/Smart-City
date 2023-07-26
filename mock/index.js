// 导入mockjs(加载模拟数据)
const mockjs = require('mockjs')

// 加载数据
// 1. 武汉城市数据
const wuhan_buildings = require('./Wuhan_Buildings.json')
// 2. 武汉道路数据
const wuhan_roads = require('./Wuhan_roads.json')
// 3. 武汉交通事件数据
const wuhan_events = require('./Wuhan_events.json')
// 此处为后端访问接口的url，需要与前端页面保持一致
// 4.杭州车祸数据
const hangzhou_events = require('./hangzhou.json')

// 导出函数
module.exports = () => {
  return mockjs.mock({
    // 导出url
    hangzhou_events,
    wuhan_buildings,
    wuhan_roads,
    wuhan_events,
  })
}
