import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served at subdomain root (tinker.marineflow.co.za) — not nested under a path.
  base: '/',
})
