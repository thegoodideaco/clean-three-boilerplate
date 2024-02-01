import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { glslify } from 'vite-plugin-glslify'

import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    vue(),
    vueJsx(),
    glslify({
      include: [/\.glsl$/, /\.vs$/, /\.fs$/, /\.vert$/, /\.frag$/, /\.glslify$/, /\.glslx$/]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  assetsInclude: [/\.gl(b|tf)$/, /\.hdr$/, '**/*.glb']
})
