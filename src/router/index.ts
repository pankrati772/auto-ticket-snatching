/*
 * @Author: PSB
 * @Date: 2023-03-26 19:36:18
 * @LastEditors: PSB
 * @LastEditTime: 2023-03-26 19:39:35
 * @FilePath: \auto-ticket-snatching\src\router\index.ts
 */
import { createRouter, createWebHashHistory } from 'vue-router'


export const routes = [
    {
        path: '/',
        name: 'index', // 必须与组件name一致
        component: () => import('@/views/index/index.vue'), // 车型选择页面
        meta: {
            title: 'index',
            keepAlive: false // 是否开启缓存
        }

    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router