<template>
  <div
    @dblclick="loadRandom"
    class="rapier-view"
    ref="containerEl"
    @pointermove="appRef?.caster?.cast()"
  >
    <!-- Canvas will go here -->
  </div>

  <div class="text-yellow-500 relative">
    hello
    <RouterLink to="/hearts" class="back-button"> hearts </RouterLink>
    <RouterLink to="/4th" class="back-button"> 4th of july </RouterLink>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, shallowRef, type Ref } from 'vue'
import { RapierApp } from './RapierApp'
import { MyControls } from '../MyControls'
import { RouterLink } from 'vue-router'
import { load as loadLUT, loadRandom, lutPass } from '@/modules/loaders/LutLoader'

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

      await loadLUT(3)

      app.composer.addPass(lutPass)

      app.renderer.setClearColor(0x000000, 0)

      appRef.value = app
      if (import.meta.env.DEV) {
        Object.assign(window, {
          app
        })
      }
    })

    return {
      appRef,
      containerEl,
      controlsRef,
      loadRandom
    }
  },
  components: { RouterLink }
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

  // background-image: linear-gradient(to bottom, hsl(256, 68%, 70%) 0%, hsl(256, 80%, 40%) 100%);

  :deep(canvas) {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
