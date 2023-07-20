import { getCityBuildings } from '@/api/smart_city.js'

import { CityBuildingLayer } from '@antv/l7'

export default async () => {
  // 获取建筑数据
  const building_data = await getCityBuildings()

  // 创建城市建筑图层
  const building_layer = new CityBuildingLayer({
    name: '武汉市',
  })

  // 配置图层
  building_layer
    .source(building_data)
    // 设置高度字段
    .size('Elevation', (h) => h)
    // 楼房颜色
    .color('rgba(242,246,250,1.0)')
    // 是否开启动画效果 在开启 animate 后默认会打开点亮窗户的动画
    .animate({
      enable: true,
    })
    // 鼠标悬浮，元素高亮效果
    .active({
      color: '#0ff',
      mix: 0.5,
    })
    // 设置楼房样式，可以参考文档
    .style({
      opacity: 0.7,
      baseColor: 'rgb(16, 16, 16)',
      windowColor: 'rgb(30, 60, 89)',
      brightColor: 'rgb(255, 176, 38)',
      sweep: {
        enable: true,
        sweepRadius: 2,
        sweepColor: '#1990FF',
        sweepSpeed: 0.3,
        sweepCenter: [114.3, 30.5],
      },
    })
    // 只保留高度大于40的楼房
    .filter('Elevation', (h) => h > 40)

  // 返回图层对象
  return building_layer
}
