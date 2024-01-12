import {
  PCFSoftShadowMap,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  type WebGLRendererParameters,
  WebGLRenderTarget
} from 'three'
import { EffectComposer, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js'
import { effectScope, onScopeDispose, watchEffect } from 'vue'
import { useViewInfo } from './hooks/useViewProp'
import { useRenderLoop } from './useRenderLoop'
import { Ticker } from 'pixi.js'
import { useSharedTickerCallback } from './hooks/useSharedTickerCallback'

export class ThreeApp {
  camera!: PerspectiveCamera
  renderer!: WebGLRenderer
  scene!: Scene
  composer!: EffectComposer

  useComposer: Boolean = true

  scope = effectScope()
  ticker: Ticker

  /**
   * Initialize the camera
   */
  #initCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2
    return camera
  }

  /**
   * Initialize the renderer
   */
  #initRenderer(params?: WebGLRendererParameters): WebGLRenderer {
    const renderer = new WebGLRenderer(params)

    renderer.debug.checkShaderErrors = import.meta.env.DEV

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? Math.max(2, window.devicePixelRatio) : 1)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap

    // document.body.appendChild(renderer.domElement)

    onScopeDispose(() => {
      console.log('dispose the renderer')
      // document.body.removeChild(renderer.domElement)

      renderer.setAnimationLoop(null)
      renderer.forceContextLoss()
      renderer.dispose()
    })

    return renderer
  }

  /**
   * Initialize the composer
   */
  #initComposer(scene: Scene, camera: PerspectiveCamera): EffectComposer {
    const target = new WebGLRenderTarget(1, 1, {
      format: RGBAFormat,
      colorSpace: 'srgb',
      samples: 32
    })

    // target.samples = 16
    target.setSize(this.renderer.domElement.width, this.renderer.domElement.height)

    const composer = new EffectComposer(this.renderer, target)
    const renderPass = new RenderPass(scene, camera)
    const outputPass = new OutputPass()

    composer.addPass(renderPass)
    composer.addPass(outputPass)

    onScopeDispose(() => {
      console.log('dispose the composer')
      composer.passes.forEach((pass) => {
        pass.dispose()
      })
      composer.dispose()
    })

    return composer
  }

  /**
   * Initialize the scene
   */
  #initScene(): Scene {
    const scene = new Scene()

    onScopeDispose(() => {
      console.log('dispose the scene')
      scene.clear()
    })

    return scene
  }

  #runScope(setupFn?: (ctx: this) => any) {
    const effects = this.scope.run(() => {
      this.camera = this.#initCamera()

      this.renderer = this.#initRenderer({
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: true,
        powerPreference: 'high-performance'
      })

      this.scene = this.#initScene()

      this.composer = this.#initComposer(this.scene, this.camera)

      const { width, height, aspectRatio } = useViewInfo()

      watchEffect(() => {
        this.setSize(width.value, height.value)
      })

      watchEffect(() => {
        this.setAspect(aspectRatio.value)
      })

      const { ticker } = useSharedTickerCallback(() => {
        this.render()
      })

      useRenderLoop(this.renderer, (elapsed) => {
        this.ticker.update(elapsed)
      })

      const values = {
        camera: this.camera,
        renderer: this.renderer,
        scene: this.scene,
        composer: this.composer,
        setupState: undefined as typeof setupFn | undefined,
        ticker
      }

      if (setupFn) {
        values.setupState = setupFn(this)
      }

      return values
    })

    return effects!
  }

  constructor(container: HTMLElement = document.body, setupFn?: (ctx: ThreeApp) => any) {
    const {
      renderer: { domElement },
      ticker
    } = this.#runScope(setupFn)

    this.ticker = ticker

    container.appendChild(domElement)
  }

  render() {
    if (!this.scope.active) return

    if (this.useComposer) {
      const rp = this.composer.passes[0]
      if (rp instanceof RenderPass && (rp.scene !== this.scene || rp.camera !== this.camera)) {
        rp.scene = this.scene
        rp.camera = this.camera
      }

      this.composer.render()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }

  /**
   * Resize the renderer
   */
  setSize(width: number, height: number) {
    this.setAspect(width / height)

    this.renderer.setSize(width, height)
    this.composer.setSize(width, height)
  }

  /**
   * Set the aspect ratio of the camera.
   *
   * If the aspect ratio is the same as the current one, ignore
   */
  setAspect(aspect: number) {
    if (this.camera.aspect === aspect) return

    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  /**
   * Dispose the app
   */
  dispose() {
    this.scope.stop(false)
  }
}


