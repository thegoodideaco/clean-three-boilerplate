import * as vue from 'vue'
import * as vueUse from '@vueuse/core'
import * as THREE from 'three'
import * as addons from 'three/examples/jsm/Addons.js'

import * as threeExtendMaterial from 'three-extend-material'

export default {
  vue,
  vueUse: { ...vueUse },
  THREE: { ...THREE },
  addons: { ...addons },
  threeExtendMaterial
}
