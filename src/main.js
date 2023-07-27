// 导入初始化样式
import './assets/styles/reset.css'

// 配置ElementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'

// 注册插件
import Mapbox from './plugins/mapbox.js'

// 注册路由
import router from './routers/router'

createApp(App).use(ElementPlus).use(Mapbox).use(router).mount('#app')
