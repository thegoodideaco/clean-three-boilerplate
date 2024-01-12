import { Ticker } from 'pixi.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { useSharedTickerCallback } from './useSharedTickerCallback'
import { onScopeDispose } from 'vue'

/**
 * A hook to create and update OrbitControls
 *
 * @param camera The camera to control
 * @param element The element to attach the controls to
 *
 * @returns The OrbitControls instance
 */
export function useOrbitControls(camera: THREE.Camera, element: HTMLElement = document.body) {
  const controls = new OrbitControls(camera, element)
  controls.enableDamping = true

  useSharedTickerCallback(() => {
    controls.update()
  })

  onScopeDispose(() => {
    controls.dispose()
  })

  return controls
}
