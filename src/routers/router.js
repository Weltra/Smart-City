import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/SmartCity/index.vue'
import heatMapTabel from '../views/HeatMapTable/HeatMapTable.vue'
import classic from '../views/HeatMapTable/Classic/Classic.vue'
import grid from '../views/HeatMapTable/Grid/grid.vue'
import BeeHome from '../views/HeatMapTable/BeeHome/BeeHome.vue'

const router = createRouter({
  history: createWebHashHistory(),

  // 设置激活样式
  linkActiveClass: 'router-active',

  // 设置路由
  routes: [
    { path: '/', redirect: '/home' },
    // home路由
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'heatmap',
          component: heatMapTabel,
          redirect: '/home/heatmap/classic',
          children: [
            { path: 'classic', component: classic },
            { path: 'grid', component: grid },
            { path: 'beehome', component: BeeHome },
          ],
        },
      ],
    },
  ],
})

// 导出路由
export default router
