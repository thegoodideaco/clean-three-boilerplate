import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { glslify } from 'vite-plugin-glslify'

import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
// import { UserConfigFn } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
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
  assetsInclude: [/\.gl(b|tf)$/, /\.hdr$/, /\.(cube|CUBE)$/, '**/*.glb'],
  optimizeDeps: {
    esbuildOptions: {
      drop: ['console', 'debugger']
    }
  },
  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : undefined
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // const inf = getModuleInfo(id)
          const pathNames = id.split('/')

          if (pathNames.indexOf('node_modules')) {
            return 'vendor/' + pathNames[pathNames.indexOf('node_modules') + 1]

            // return 'vendor/' + inf?.id
          }
        }
      }
    }
  },
  css: {
    devSourcemap: true
  }
}))
