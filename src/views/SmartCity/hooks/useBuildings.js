import { getCityBuildings } from '@/api/smart_city.js'

import { CityBuildingLayer } from '@antv/l7'

export default async () => {
  // 获取建筑数据
  const building_data = await getCityBuildings()

  // 创建城市建筑图层
  const building_layer = new CityBuildingLayer({
    name: '杭州市',
  })

  // 配置图层
  building_layer
    .source(building_data)
    .size('floor', (h) => h * 4)
    .color('#f4d7ba')
    .animate({
      enable: true,
    })
    .active({
      color: '#0ff',
      mix: 0.5,
    })
    .style({
      opacity: 0.7,
      baseColor: '#d0d2cd',
      windowColor: '#8093af',
      brightColor: '#c3afcb',
      // sweep: {
      //   enable: true,
      //   sweepRadius: 2,
      //   sweepColor: '#1990FF',
      //   sweepSpeed: 0,
      //   sweepCenter: [120.2, 30.25],
      // },
    })
    .filter('floor', (h) => h >= 5)

  // 返回图层对象
  return building_layer
}
