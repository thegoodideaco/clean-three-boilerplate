import { loadEnvironment } from '@/modules/loaders/environmentLoader'
import { ThreeApp } from '../ThreeRenderer'
import { useOrbitControls } from '../hooks/useOrbitControls'
import { HeartMesh } from './HeartMesh'
// import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'
import { MeshPhysicalMaterial } from 'three'
import { usePane } from '@/modules/tweakpane/tweakpane.extended'
import { ref } from 'vue'

export default class HeartsApp extends ThreeApp {
  public mesh: HeartMesh
  public static controls = ref<ReturnType<typeof useOrbitControls>>()

  constructor(htmlElement: HTMLElement) {
    super(htmlElement, async (ctx) => {
      const controls = useOrbitControls(
        ctx.camera,
        (htmlElement.closest('.hearts-container') as HTMLElement) || htmlElement
      )
      ctx.scene.environment = await loadEnvironment(6)

      ctx.scene.userData.controls = controls

      // const dimensions = ctx.renderer.getSize(new Vector2())

      // ctx.composer.addPass(new SMAAPass(dimensions.x, dimensions.y))
      // ctx.composer.insertPass(
      //   new OutlinePass(dimensions, ctx.scene, ctx.camera, ctx.scene.children),
      //   2
      // )

      HeartsApp.controls.value = controls

      ctx.dispatchEvent({ type: 'load' })

      return {
        controls
      }
    })

    this.renderer.setClearColor(0x000000, 0)

    this.mesh = new HeartMesh(2000)
    this.scene.add(this.mesh)

    this.camera.near = 0.01
    this.camera.far = 1000
    this.camera.position.z = 15
    this.camera.rotateY(Math.PI) // look towards the light
    this.camera.updateProjectionMatrix()

    this.mesh.scatter(200, 200, 150)

    this._hexColor.value = (this.mesh.material as MeshPhysicalMaterial).sheenColor.getHexString()

    this.setupDebuggerPanes()
  }

  private _hexColor = ref('#ff0000')
  get hexColor() {
    return (this.mesh.material as MeshPhysicalMaterial).sheenColor.getStyle()
  }
  set hexColor(value: string) {
    this._hexColor.value = value

    if (
      this.mesh.material instanceof MeshPhysicalMaterial &&
      this.mesh.material.sheenColor.getHexString() !== value.replace('#', '')
    ) {
      this.mesh.material.sheenColor.set(this._hexColor.value)
    }
  }

  /**
   * Used in dev mode
   */
  setupDebuggerPanes() {
    const pane = usePane()

    pane.addBinding(this.mesh.material as MeshPhysicalMaterial, 'roughness', {
      label: 'Roughness',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as MeshPhysicalMaterial, 'metalness', {
      label: 'Metalness',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as MeshPhysicalMaterial, 'sheen', {
      label: 'Sheen',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as MeshPhysicalMaterial, 'sheenColor', {
      label: 'Sheen Color',
      color: {
        type: 'float',
        alpha: false
      }
    })

    pane.addBinding(this.mesh.material as MeshPhysicalMaterial, 'sheenRoughness', {
      label: 'SheenRoughness',
      min: 0,
      max: 1
    })

    const tickerPane = usePane(pane)

    tickerPane.addBinding(this.ticker, 'speed', {
      label: 'Speed',
      min: 0,
      max: 2
    })
  }
}
