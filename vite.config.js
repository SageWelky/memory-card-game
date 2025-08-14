import { defineConfig } from 'vite'
import { patchCssModules } from 'vite-css-modules'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    patchCssModules(),
    react()
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      context: path.resolve(__dirname, 'src/context'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      modules: path.resolve(__dirname, 'src/modules'),
      services: path.resolve(__dirname, 'src/services'),
      utils: path.resolve(__dirname, 'src/utils'),
      common: path.resolve(__dirname, 'src/modules/common'),
      components: path.resolve(__dirname, 'src/modules/components'),
    },
  },
})
