/**
 * Scrolling behavior logic
 * and state management.
 *
 */

import Lenis from '@studio-freight/lenis'
import './lenis.css'
import { useRafFn } from '@vueuse/core'
import { markRaw, onScopeDispose, ref } from 'vue'
import { MathUtils } from 'three'

export default () => {
  const lenis = new Lenis({
    wrapper: document.body,
    easing(t) {
      return MathUtils.smootherstep(t, 0.5, 0.7)
    },
    infinite: false,
    lerp: 0.1,
    normalizeWheel: true
    // duration: 2
  })

  markRaw(lenis)

  const velocity = ref(lenis.progress)

  // lenis.on('scroll', (e: typeof lenis) => {
  //   console.log(e.velocity)
  // })

  const rafState = useRafFn(
    ({ timestamp }) => {
      lenis.raf(timestamp)

      velocity.value = lenis.progress
    },
    {
      immediate: true
    }
  )

  const { isActive, pause, resume } = rafState

  onScopeDispose(() => {
    console.log('destroying lenis')
    rafState.pause()
    lenis.stop()
    lenis.destroy()
  })

  return {
    lenis,
    velocity,
    isActive,
    pause,
    resume
  }
}
