import * as vue from 'vue'
import * as vueUse from '@vueuse/core'
import * as THREE from 'three'
import * as addons from 'three/examples/jsm/Addons.js'
import { MyCustomStandardMaterial } from './views/3d/MyCustomStandardMaterial'
import * as PIXI from 'pixi.js'

export default {
  vue,
  vueUse: { ...vueUse },
  THREE: { ...THREE },
  addons: { ...addons },
  custom: {
    MyCustomStandardMaterial: MyCustomStandardMaterial
  },
  pixi: PIXI
}
