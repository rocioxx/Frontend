// vite.config.ts

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  // Solo se necesita el plugin de React. Tailwind se maneja por PostCSS.
  plugins: [react()], 
  resolve: {
    // ESTO es lo esencial para que el alias @/ funcione
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})