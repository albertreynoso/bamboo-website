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
})
