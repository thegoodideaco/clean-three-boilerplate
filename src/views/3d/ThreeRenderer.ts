import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { EffectComposer } from 'three/examples/jsm/Addons.js'

export class ThreeRenderer {
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  scene: Scene
  composer: EffectComposer

  /**
   * Initialize the camera
   */
  #initCamera(): THREE.PerspectiveCamera {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2
    return camera
  }

  /**
   * Initialize the renderer
   */
  #initRenderer(): THREE.WebGLRenderer {
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    return renderer
  }

  /**
   * Initialize the composer
   */
  #initComposer(): EffectComposer {
    const composer = new EffectComposer(this.renderer)
    return composer
  }

  /**
   * Initialize the scene
   */
  #initScene(): THREE.Scene {
    const scene = new Scene()
    return scene
  }

  constructor() {
    this.camera = this.#initCamera()

    this.renderer = this.#initRenderer()

    this.scene = this.#initScene()

    this.composer = this.#initComposer()
  }
}
