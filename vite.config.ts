import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"",
  build:{
    assetsDir:""
  },
  server: {
    proxy: {
      "/wp-json":{
        target:"https://dashleague.games",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/wp-json/, ""),
      },
      "/dashcam":{
        target:"https://www.hyperdashcup.com",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
