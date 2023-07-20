import { getRoads } from '@/api/smart_city'

import { LineLayer } from '@antv/l7'

export default async () => {
  // 获取道路数据
  const roads_data = await getRoads()

  // 创建道路图层
  const roads_layer = new LineLayer({
    name: '武汉市道路',
    zIndex: 0,
    depth: true,
  })
    // 添加道路数据
    .source(roads_data)
    // 设置道路宽度
    .size(1)
    .shape('line')
    // 设置颜色
    .color('#1990FF')
    //设置道路流线的效果
    .animate({
      interval: 1, // 间隔
      duration: 2, // 持续时间，延时
      trailLength: 2, // 流线长度
    })
    // 将过短的数据筛选掉
    .filter('coordinates', (evt) => {
      return evt.length > 20
    })

  return roads_layer
}
