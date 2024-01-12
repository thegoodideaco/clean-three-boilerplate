import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { ThreeApp } from '../ThreeRenderer'

import gltfUrl from './scene.glb?url'
import {
  Mesh,
  DirectionalLight,
  SpotLight,
  PointLight,
  Light
  // LightShadow
  // PointLightShadow,
  // SpotLightShadow
} from 'three'
import { useOrbitControls } from '../hooks/useOrbitControls'

import { getCurrentScope, ref, shallowRef } from 'vue'

const gltfLoader = new GLTFLoader()

export class RapierApp extends ThreeApp {
  orbitControls: OrbitControls

  constructor(container?: HTMLElement, onLoad?: () => void) {
    const orbitControlsRef = shallowRef<OrbitControls>()

    super(container, (ctx: ThreeApp) => {
      console.log(getCurrentScope())
      orbitControlsRef.value = useOrbitControls(ctx.camera, ctx.renderer.domElement)
      if (onLoad !== undefined) {
        this.load().then(onLoad.bind(this))
      }

      console.log(gltfUrl)
    })

    this.orbitControls = orbitControlsRef.value!
  }

  async load() {
    const gltf = await gltfLoader.loadAsync(gltfUrl)
    const root = gltf.scene

    root.traverse((child) => {
      /**
       * if there are no normals, compute them
       */
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true

        if (child.geometry?.attributes.normal) {
          child.geometry.computeVertexNormals()
        }
      }

      if (child instanceof Light && child.shadow?.mapSize) {
        child.shadow.bias = 0.0001

        child.shadow.radius = 3
        child.shadow.blurSamples = 32
        child.shadow.mapSize.width = 1024
        child.shadow.mapSize.height = 1024

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

    const _camera = root.getObjectByProperty('isCamera', true) as
      | THREE.PerspectiveCamera
      | undefined
    if (_camera) {
      _camera.aspect = window.innerWidth / window.innerHeight
      _camera.updateProjectionMatrix()

      this.camera = _camera

      this.orbitControls.object = this.camera
    }

    return gltf
  }
}
