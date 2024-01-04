import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { glslify } from 'vite-plugin-glslify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    glslify({
      include: [/\.glsl$/, /\.vs$/, /\.fs$/, /\.vert$/, /\.frag$/, /\.glslify$/, /\.glslx$/]
    })
  ],
  build: {
    target: 'es2015',
    lib: {
      entry: 'src/index.ts',
      name: 'Vue3D',
      formats: ['umd']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  assetsInclude: [/\.gl(b|tf)$/, /\.hdr$/]
})
