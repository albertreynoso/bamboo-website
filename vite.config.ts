import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.bamboostudiodental.com',
      dynamicRoutes: ['/'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api', '/admin'],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.PNG'],
  // ✅ AGREGAR ESTA SECCIÓN (solo para desarrollo local)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/app': {
        target: 'https://bamboo-appweb.vercel.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/app/, ''),
      },
    },
  },
})