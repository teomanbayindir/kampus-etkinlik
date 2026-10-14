import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CSS küçültücü --no: 2311012047'yi 2311010000'e yuvarlıyor, renk tonu bozuluyor
  build: { cssMinify: false },
})
