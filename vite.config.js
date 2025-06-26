import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/product_catalog/',  
  plugins: [vue()],
})
