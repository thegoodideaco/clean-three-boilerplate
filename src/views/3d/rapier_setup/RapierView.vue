<template>
  <div class="rapier-view" ref="containerEl">
    <!-- Canvas will go here -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref, shallowRef, type Ref } from 'vue'
import { RapierApp } from './RapierApp'
import { MyControls } from '../MyControls'

export default {
  setup() {
    const containerEl: Ref<HTMLDivElement | null> = ref(null)

    const appRef = shallowRef() as Ref<RapierApp | null>

    const controlsRef = shallowRef(null) as Ref<MyControls | null>

    onMounted(async () => {
      const container = containerEl.value
      if (!container) return

      const app = new RapierApp(container)

      await app.load()

      appRef.value = app

      app.orbitControls.screenSpacePanning = false

      if (import.meta.env.DEV) {
        Object.assign(window, {
          app
        })
      }
    })

    return {
      appRef,
      containerEl,
      controlsRef
    }
  }
}
</script>

<style lang="scss" scoped>
.rapier-view {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-color: chocolate;

  :deep(canvas) {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
