/*
 * @Author: PSB
 * @Date: 2023-03-24 14:14:41
 * @LastEditors: PSB
 * @LastEditTime: 2023-03-26 19:39:07
 * @FilePath: \auto-ticket-snatching\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {

    preprocessorOptions: {

      // scss: {

      //   additionalData: '@import "@/assets/styles/main.scss";'

      // }

    }

  }
})
