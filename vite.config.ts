import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      '8879-2401-4900-1c36-428f-5228-4aff-fe4c-684b.ngrok-free.app',
    ],
  },
})
