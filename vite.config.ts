import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/dash":{
        target:"https://dashleague.games",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dash/, ""),
      }
    }
  }
})
