import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

export class MyControls extends OrbitControls {
  constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    super(camera, renderer.domElement)

    this.enableDamping = true
  }
}
