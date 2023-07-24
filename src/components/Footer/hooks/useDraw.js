import { DrawEvent, DrawPolygon, DrawRect, DrawCircle } from '@antv/l7-draw'
import { inject } from 'vue'

export default () => {
  let draw = null
  const { scene } = inject('$scene_map')

  // 初始化工具
  const initTool = (tool) => {
    if (draw) {
      draw.clear()
      draw.disable()
      draw.removeActiveFeature()
      draw = null
    }
    switch (tool) {
      case 'drawPolygonTool':
        draw = new DrawPolygon(scene, {})
        break
      case 'drawRectTool':
        draw = new DrawRect(scene, {})
        break
      case 'drawCircleTool':
        draw = new DrawCircle(scene, {})
        break
      default:
        break
    }
  }

  function queryEvents(type) {
    initTool(type)
    if (type === 'delete') {
      return
    }
    draw.enable()
    draw.on(DrawEvent.Change, (allFeatures) => {
      allFeatures.forEach((item, index) => {
        if (index !== allFeatures.length - 1) {
          draw.removeFeature(item)
        }
      })
    })
  }

  return {
    queryEvents,
  }
}
