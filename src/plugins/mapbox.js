// 引入相关依赖,mapbox相关，L7相关，路由相关
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Scene } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export default {
  install(app) {
    // 引入token
    const token = import.meta.env.VITE_TOKEN
    mapboxgl.accessToken = token

    // 创建地图容器
    const container = document.createElement('div')
    container.setAttribute('id', 'map')
    container.setAttribute('style', 'width:100%; height:100%')
    document.body.appendChild(container)

    // 初始化地图对象
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [114.3, 30.5],
      zoom: 2,
      projection: 'globe',
    })

    // 开启雾化
    map.on('style.load', () => {
      map.setFog({})
    })

    // 初始化antv-L7场景
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        mapInstance: map,
      }),
      logoVisible: false,
    })
    // 使用provide, 添加到app应用实例上, 全局共享
    app.provide('$scene_map', { scene, map })
  },
}
