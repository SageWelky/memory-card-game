import { defineConfig } from 'vite'
import { patchCssModules } from 'vite-css-modules'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    patchCssModules(),
    react()
  ],
})
