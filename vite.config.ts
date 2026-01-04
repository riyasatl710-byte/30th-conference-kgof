import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Make sure the base matches the GitHub Pages repo path
  base: '/30th-conference-kgof/',
  plugins: [react()],
})
