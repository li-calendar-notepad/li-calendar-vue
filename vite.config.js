import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 8080, //端口号
    // 跨域代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9090",// 后项目地址
        changeOrigin: true,
        rewrite: (path) => {
          return path
        },
      }
    },
    open: true //启动后是否自动打开浏览器
  }
})
