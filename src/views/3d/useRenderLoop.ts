import { useDocumentVisibility } from '@vueuse/core'
import { onScopeDispose, watchEffect } from 'vue'

/**
 * Sets the renderer animation loop to the render function
 *
 * disables the animation loop if the document is not visible
 *
 * removes the animation loop when the scope is disposed of
 */

export function useRenderLoop(renderer: THREE.WebGLRenderer, renderFn: XRFrameRequestCallback) {
  const docVisible = useDocumentVisibility()

  const stop = watchEffect(() => {
    if (docVisible.value) {
      renderer.setAnimationLoop(renderFn)
    } else {
      renderer.setAnimationLoop(null)
    }
  })

  onScopeDispose(() => {
    console.log('dispose the render loop')
    renderer.setAnimationLoop(null)
  })

  return {
    stop
  }
}
