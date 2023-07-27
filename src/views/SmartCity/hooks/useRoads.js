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
    .source(roads_data) // 加载数据源
    .size(1) // 设置大小 (线宽)
    .shape('line') // 设置形状
    .color('#dfedfd') // 设置颜色
    .animate({
      trailLength: 2, // 流线长度
      duration: 2, // 持续时间
      interval: 1, // 间隔周期
    }) // 设置动画

  return roads_layer
}
