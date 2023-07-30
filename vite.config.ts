import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/map-visualizer/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: []
    }
  }
})
