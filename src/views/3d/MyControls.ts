import type { Camera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export class MyControls extends OrbitControls {
  constructor(camera: Camera, renderer: WebGLRenderer) {
    super(camera, renderer.domElement)

    this.enableDamping = false
  }
}
