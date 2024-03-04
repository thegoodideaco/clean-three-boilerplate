/// <reference types="vitest" />

import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults, mergeConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteConfig from './vite.config.mjs'

export default defineConfig((env) => {
  return mergeConfig(viteConfig(env), {
    plugins: [tsconfigPaths()],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
})
