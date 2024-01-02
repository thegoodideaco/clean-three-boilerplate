import { useDocumentVisibility, usePointer, useWindowFocus, useWindowSize } from '@vueuse/core'
import { useMouse } from '@vueuse/core/index.cjs'
import { computed } from 'vue'
/**
 * Reactive view properties for the current display.
 *
 * @returns a collection of refs for the current view properties.
 */
export const useViewInfo = () => {
  const visibility = useDocumentVisibility()
  const documentVisible = computed(() => visibility.value === 'visible')
  const windowFocused = useWindowFocus()
  const { width, height } = useWindowSize()
  const { x, y } = useMouse({
    initialValue: {
      x: width.value / 2,
      y: height.value / 2
    }
  })

  const glX = computed(() => (x.value / width.value) * 2 - 1)
  const glY = computed(() => (-y.value / height.value) * 2 + 1)

  const aspectRatio = computed(() => width.value / height.value)

  return {
    documentVisible,
    windowFocused,
    x,
    y,
    glX,
    glY,
    width,
    height,
    aspectRatio
  }
}
