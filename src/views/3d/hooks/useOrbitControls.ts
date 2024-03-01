import { UPDATE_PRIORITY } from '@pixi/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useSharedTickerCallback } from './useSharedTickerCallback'
import { onScopeDispose } from 'vue'
import type { Camera } from 'three'

/**
 * A hook to create and update OrbitControls
 *
 * @param camera The camera to control
 * @param element The element to attach the controls to
 *
 * @returns The OrbitControls instance
 */
export function useOrbitControls(camera: Camera, element: HTMLElement = document.body) {
  const controls = new OrbitControls(camera, element)
  controls.enableDamping = true

  useSharedTickerCallback(
    (_dt) => {
      controls.update()
    },
    undefined,
    UPDATE_PRIORITY.HIGH
  )

  onScopeDispose(() => {
    controls.dispose()
  })

  return controls
}
