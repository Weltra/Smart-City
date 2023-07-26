// 导入接口
import { getHangzhouEvent } from '@/api/smart_city.js'
// 官方文档设置三维高度，存在表面效应
// 拟在event事件中添加times属性记录出现车祸的次数，用于渲染
import { HeatmapLayer } from '@antv/l7'

export default async (type, colors) => {
  // 获取数据
  const heatData = await getHangzhouEvent()
  const heatMap = new HeatmapLayer({
    name: 'heatmap',
  })
    .source(heatData)
    .shape(type)
    // 不限制属性类型，均可传入
    .size('times', [0, 2.0]) // weight映射通道
    .style({
      intensity: 2,
      radius: 20,
      rampColors: {
        colors: colors,
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    })

  return heatMap
}
