import THREE from 'three'
import type { EffectComposer } from 'three/examples/jsm/Addons.js'
import { effectScope } from 'vue'

export function useThreeDebugUtils(
  _scene: THREE.Scene,
  camera: THREE.Camera,
  _renderer: THREE.WebGLRenderer,
  _composer: EffectComposer
) {
  const scope = effectScope()

  const createHelpers = () => {
    const helpers = new THREE.Group()

    const gridHelper = new THREE.GridHelper(10, 10)
    gridHelper.position.y = -1
    helpers.add(gridHelper)

    const axesHelper = new THREE.AxesHelper(5)
    helpers.add(axesHelper)

    const cameraHelper = new THREE.CameraHelper(camera)
    helpers.add(cameraHelper)

    return helpers
  }

  return scope.run(() => {
    const helpers = createHelpers()
    _scene.add(helpers)

    return {
      helpers
    }
  })
}
