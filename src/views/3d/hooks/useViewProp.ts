import { useDocumentVisibility, useWindowFocus, useWindowSize, useMouse } from '@vueuse/core'
import { computed } from 'vue'

/**
 * Returns an object containing various view-related properties and hooks.
 * @returns An object with the following properties:
 * - documentVisible: A computed property indicating whether the document is currently visible.
 * - windowFocused: A hook indicating whether the window is currently focused.
 * - x: The current x-coordinate of the mouse cursor.
 * - y: The current y-coordinate of the mouse cursor.
 * - glX: A computed property representing the normalized x-coordinate for WebGL rendering.
 * - glY: A computed property representing the normalized y-coordinate for WebGL rendering.
 * - width: The current width of the window.
 * - height: The current height of the window.
 * - aspectRatio: A computed property representing the aspect ratio of the window.
 */
export function useViewInfo() {
  const visibility = useDocumentVisibility()

  /**
   * @description The aspect ratio of the window.
   */
  const documentVisible = computed(() => visibility.value === 'visible')
  const windowFocused = useWindowFocus()
  const { width, height } = useWindowSize()
  const { x: mouseX, y: mouseY } = useMouse({
    initialValue: {
      x: width.value / 2,
      y: height.value / 2
    }
  })

  const glX = computed(() => (mouseX.value / width.value) * 2 - 1)
  const glY = computed(() => (-mouseY.value / height.value) * 2 + 1)

  /**
   * @description The aspect ratio of the window.
   */
  const aspectRatio = computed(() => width.value / height.value)

  return {
    documentVisible,
    windowFocused,
    mouseX,
    mouseY,
    glX,
    glY,
    width,
    height,
    aspectRatio
  }
}
