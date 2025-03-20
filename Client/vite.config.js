import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5014', // Backend URL
//         changeOrigin: true, // Changes the origin of the host header
//         secure: false, // If the backend is using HTTPS, set to true
//       },
//     },
  },
})
