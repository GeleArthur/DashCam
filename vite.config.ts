import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Errors are incorrect. WARNING dont install @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"./",

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
