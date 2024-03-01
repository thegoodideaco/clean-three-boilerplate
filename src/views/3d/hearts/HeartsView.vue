<template>
  <div class="hearts-container absolute top-0 left-0 w-screen h-screen overflow-hidden">
    <div class="container-behind absolute top-0 left-0 w-screen h-screen select-none">
      This gpoes behind the canvas
    </div>
    <div
      v-show="isLoaded"
      class="hearts-view"
      ref="containerEl"
      @dblclick="appRef?.mesh.scatter(100)"
    >
      <!-- Canvas will go here -->
    </div>
    <div class="container-above absolute top-0 left-0 w-screen h-screen select-none">
      Hello there
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, shallowRef, type Ref, markRaw } from 'vue'
import HeartsApp from './HeartsApp'

export default {
  setup() {
    const containerEl: Ref<HTMLDivElement | null> = ref(null)

    const appRef = shallowRef() as Ref<HeartsApp | null>

    const isLoaded = ref(false)

    onMounted(async () => {
      const container = containerEl.value
      if (!container) return

      const app = new HeartsApp(container)
      markRaw(app)
      appRef.value = app

      app.addEventListener('load', () => {
        isLoaded.value = true
      })

      if (import.meta.env.DEV) {
        Object.assign(window, {
          app
        })
      }
    })

    return {
      appRef,
      containerEl,
      isLoaded
    }
  }
}
</script>

<style lang="scss" scoped>
.hearts-view {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  :deep(canvas) {
    min-width: 100%;
    min-height: 100%;
  }
}

.container-behind {
  background-image: linear-gradient(to bottom, hsl(256, 68%, 70%) 0%, hsl(256, 80%, 40%) 100%);
}
</style>
