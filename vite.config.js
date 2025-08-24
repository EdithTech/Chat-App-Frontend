import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Adjust based on your project's file types
  ],
  plugins: [
    react(),
    tailwindcss(),
  ],

})
