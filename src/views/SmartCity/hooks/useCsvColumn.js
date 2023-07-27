// 导入heatmap组件工具
import { HeatmapLayer } from '@antv/l7'
// 导入后端数据接口
import { getCsv } from '@/api/smart_city.js'

// name:图层名称
// type:样式类型
// size:单元大小(未知)
// shape:像元形状
// coverage:像元密度
// colorList:色带列表
// base:对比度
export default async (name, type, size, shape, coverage, colorList, base) => {
  const csvData = await getCsv()
  const csvHeatMap = new HeatmapLayer({
    name: name,
  })
    .source(csvData, {
      // 数据属性映射
      parser: {
        type: 'csv',
        x: 'lng',
        y: 'lat',
      },
      transforms: [
        {
          type: type, //grid网格和hexagon蜂窝
          size: size,
          field: 'times',
          method: 'sum',
        },
      ],
    })
    // 蜂窝专属，表示柱子高度
    .size('sum', (value) => {
      return value * base
    })
    .shape(shape) //网格：square、circle。蜂巢：hexagon、hexagonColumn
    .style({
      coverage: coverage, //密度,粗细
      angle: 0,
    })
    .color('count', colorList)

  return csvHeatMap
}
