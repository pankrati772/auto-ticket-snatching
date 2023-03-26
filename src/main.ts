/*
 * @Author: PSB
 * @Date: 2023-03-24 14:14:41
 * @LastEditors: PSB
 * @LastEditTime: 2023-03-26 19:41:51
 * @FilePath: \auto-ticket-snatching\src\main.ts
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

// elementplus引入
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

console.log(window, 'window')

const app = createApp(App)
app.use(ElementPlus).provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(router)
  app.mount('#app')