import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // change if you're deploying to github pages
  resolve: {
    preserveSymlinks: true // necessary for yarn link to work
  }
})
