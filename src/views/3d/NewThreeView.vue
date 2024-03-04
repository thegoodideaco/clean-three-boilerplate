<template>
  <div class="three-view" ref="containerEl">
    <!-- app goes here -->
  </div>
</template>

<script lang="ts">
import { markRaw, onMounted, ref, type Ref } from 'vue'
import { ThreeApp } from './ThreeRenderer'
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

export default {
  setup() {
    const containerEl = ref(null) as Ref<HTMLDivElement | null>

    onMounted(() => {
      console.log('container.value', containerEl.value)

      if (!containerEl.value) return

      const app = new ThreeApp(containerEl.value)
      markRaw(app)

      const box = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      )
      box.onAfterRender = () => {
        box.rotation.x += 0.01
        box.rotation.y += 0.01
      }
      app.scene.add(box)
    })

    return {
      containerEl
    }
  }
}
</script>

<style lang="scss" scoped>
.three-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'import { Mesh, BoxGeometry,
MeshBasicMaterial } from 'three' BoxGeometry, , MeshBasicMaterial
