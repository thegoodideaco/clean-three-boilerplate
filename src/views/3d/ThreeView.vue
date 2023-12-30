<template>
  <div class="three-view">
    <canvas id="three-canvas" ref="canvasEl" v-pre> </canvas>
  </div>
</template>

<script lang="ts">
import {
  BoxGeometry,
  // Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
  Clock
} from 'three'
import { ref, onMounted, type Ref } from 'vue'
import { MyShaderMaterial } from './MYShaderMaterial'
import { MyControls } from './MyControls'

export default {
  setup() {
    const canvasEl: Ref<HTMLCanvasElement | null> = ref(null)

    onMounted(() => {
      const canvas = canvasEl.value
      if (!canvas) return

      const renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.pixelRatio = Math.min(window.devicePixelRatio, 2)

      const aspect = window.innerWidth / window.innerHeight

      const camera = new PerspectiveCamera(75, aspect, 0.1, 1000)

      const scene = new Scene()

      const geometry = new BoxGeometry()

      const mesh = new Mesh(geometry)

      const mat = new MyShaderMaterial()

      mesh.material = mat

      mesh.onBeforeRender = () => {
        mesh.rotation.x += 0.001
        mesh.rotation.y += 0.001
      }

      if (mesh.material instanceof MeshBasicMaterial) {
        // mesh.material.color = new Color(0x00ff00)
        // mesh.material.wireframe = true
      }

      const controls = new MyControls(camera, renderer)

      scene.add(mesh)

      const light = new PointLight(0xffffff, 1, 1000)
      scene.add(light)

      camera.position.z = 2
      const c = new Clock()

      const animate = () => {
        const delta = c.getDelta()
        requestAnimationFrame(animate)
        controls.update(delta)
        renderer.render(scene, camera)
      }

      if (import.meta.env.DEV) {
        Object.assign(window, {
          app: {
            scene,
            camera,
            renderer,
            mesh,
            light,
            animate,
            controls
          }
        })
      }

      animate()

      window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight

        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      })
    })

    return {
      canvasEl
    }
  }
}
</script>

<style lang="scss" scoped>
.three-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}
</style>