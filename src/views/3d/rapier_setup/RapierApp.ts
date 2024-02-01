import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ThreeApp } from '../ThreeRenderer'
import * as loaders from '@/modules/loaders'

import gltfUrl from './scene.glb?url'
import {
  Mesh,
  DirectionalLight,
  SpotLight,
  PointLight, // LightShadow
  AxesHelper,
  Vector3
  // PointLightShadow,
  // SpotLightShadow
} from 'three'
import { useOrbitControls } from '../hooks/useOrbitControls'

import { shallowRef, toValue, watchEffect } from 'vue'
import { AppLoaderManager } from '@/modules/loaders/Manager'
import { useRaycast } from '../hooks/useRaycast'
import { useViewInfo } from '../hooks/useViewProp'
import layerMasks from '@/utils/layer-masks'
import type { RenderPass } from 'three/examples/jsm/Addons.js'
import { useBvhRaycasting } from '../hooks/useBvhRaycasting'

loaders.gltf.manager = AppLoaderManager

const gltfLoader = loaders.gltf

export class RapierApp extends ThreeApp {
  orbitControls: OrbitControls

  caster?: ReturnType<typeof useRaycast>

  constructor(container?: HTMLElement, onLoad?: () => void) {
    const orbitControlsRef = shallowRef<OrbitControls>()
    let _caster: ReturnType<typeof useRaycast> | undefined

    super(container, (ctx: ThreeApp) => {
      orbitControlsRef.value = useOrbitControls(ctx.camera, ctx.renderer.domElement)
      if (onLoad !== undefined) {
        this.load().then(onLoad.bind(this))
      }

      const { glX: x, glY: y } = useViewInfo()

      const caster = useRaycast(ctx.camera, ctx.scene, x, y, {})

      caster.cast()

      const axes = new AxesHelper(10)
      axes.layers.set(layerMasks.HELPER)
      axes.layers.disable(layerMasks.RAYCAST)
      axes.raycast = () => [] // disable raycasting on the axes helper
      ctx.scene.add(axes)

      // const eye = new Vector3()
      // watchEffect(
      //   () => {
      //     const val = toValue(caster.intersect)
      //     if (!val) return
      //     axes.position.copy(val.point)
      //     axes.matrix.setPosition(val.point)
      //   },
      //   {
      //     flush: 'pre'
      //   }
      // )

      console.log(gltfUrl)

      _caster = caster

      return {
        caster
      }
    })

    this.caster = _caster

    // this.renderer.setClearAlpha(0)

    this.orbitControls = orbitControlsRef.value!
    this.orbitControls.screenSpacePanning = true
  }

  async load() {
    this.scene.environment = await loaders.env.loadEnvironment(1)

    const gltf = await gltfLoader.loadAsync(gltfUrl)
    const root = gltf.scene

    const cameras = gltf.cameras
    cameras.forEach((camera) => {
      camera.layers.enable(layerMasks.HELPER)
    })

    root.traverse((child) => {
      /**
       * if there are no normals, compute them
       */
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true

        // if (child.geometry?.hasAttribute('normal') === false) {
        //   child.geometry.computeVertexNormals()
        // }
        // child.geometry.computeVertexNormals()

        useBvhRaycasting(child)
      }

      if ((child instanceof PointLight || child instanceof SpotLight) && child.shadow?.mapSize) {
        child.shadow.bias = 0.0001

        child.shadow.radius = 3
        child.shadow.blurSamples = 32
        child.shadow.mapSize.width = 1024
        child.shadow.mapSize.height = 1024
        child.shadow.camera.setViewOffset
        child.shadow.needsUpdate = true

        // if (child.shadow instanceof LightShadow) {
        // }
      }

      /**
       * Assign shadows to lights
       */
      if (
        child instanceof DirectionalLight ||
        child instanceof SpotLight ||
        child instanceof PointLight
      ) {
        child.castShadow = true
      }
    })

    this.scene.add(root)

    const _camera = (cameras[0] || this.scene.getObjectByProperty('isCamera', true)) as
      | THREE.PerspectiveCamera
      | undefined
    if (_camera) {
      _camera.aspect = window.innerWidth / window.innerHeight
      _camera.updateProjectionMatrix()
      _camera.layers.enable(layerMasks.HELPER)

      this.camera = _camera
      const composerPass = this.composer.passes[0] as RenderPass

      composerPass.camera = _camera

      this.orbitControls.object = _camera

      this.camera = _camera

      this.scene.add(this.camera)

      this.camera.layers.enable(layerMasks.HELPER)
    }

    return gltf
  }
}
