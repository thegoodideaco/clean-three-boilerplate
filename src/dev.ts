import * as vue from 'vue'
import * as vueUse from '@vueuse/core'
import * as THREE from 'three'
import * as addons from 'three/examples/jsm/Addons.js'
import { MyCustomStandardMaterial } from './views/3d/MyCustomStandardMaterial'
import * as PIXI from 'pixi.js'

import * as tweakpane from 'tweakpane'
import { PaneExtended, usePane } from './modules/tweakpane/tweakpane.extended'
import { useViewInfo } from './views/3d/hooks/useViewProp'
import { piniaInstance } from './modules/pinia'
import * as pinia from 'pinia'
import { useRaycast } from './views/3d/hooks/useRaycast'
import { LoopSubdivision } from 'three-subdivide'
import * as d3 from 'd3'
import * as maath from 'maath'
import { useSharedTicker } from './views/3d/hooks/useSharedTickerCallback'
import * as cameraFitting from './utils/cameraFitting'
import gsap from 'gsap'

import * as environmentLoader from './modules/loaders/environmentLoader'
import { exportGlb } from './modules/exporting/gltfExport'
import { definePool } from './modules/particles/ObjectPool'

globalThis.THREE = THREE
//@ts-expect-error
import * as threeMeshLine from 'three.meshline/src/THREE.MeshLine.js'
import { loopThruBufferAttribute } from './utils/loopThruBufferAttribute'
import { ParticleEmitter } from './modules/particles/ParticleEmitter'
import { useBvhRaycasting } from './views/3d/hooks/useBvhRaycasting'

// delete window.THREE

export default {
  vue,
  vueUse: { ...vueUse },
  THREE: { ...THREE },
  addons: { ...addons },
  custom: {
    MyCustomStandardMaterial
  },
  pixi: PIXI,
  tweakpane,
  PaneExtended,
  usePane,
  useViewInfo,
  piniaInstance,
  pinia,
  useRaycast,
  ticker: useSharedTicker(),
  LoopSubdivision,
  d3,
  maath: { ...maath },
  cameraFitting,
  gsap,
  environmentLoader,
  exportGlb,
  definePool,
  threeMeshLine,
  loopThruBufferAttribute,
  ParticleEmitter,
  ObjectPool: definePool,
  useBvhRaycasting
}

/**
 * Hot module reloading
 */
if (import.meta.hot) {
  // HMR code

  import.meta.hot.accept((newModule) => {
    if (newModule) {
      // newModule is undefined when SyntaxError happened
      console.log('updated: module ', newModule)

      const dev = newModule.default

      if (dev) {
        Object.assign(window, {
          dev
        })
      }
    }
  })
}
