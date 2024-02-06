import { loadEnvironment } from '@/modules/loaders/environmentLoader'
import { ThreeApp } from '../ThreeRenderer'
import { useOrbitControls } from '../hooks/useOrbitControls'
import { HeartMesh } from './HeartMesh'
import { SMAAPass } from 'three/examples/jsm/Addons.js'
import { Vector2 } from 'three'
import { usePane } from '@/modules/tweakpane/tweakpane.extended'

export default class HeartsApp extends ThreeApp {
  public mesh: HeartMesh

  constructor(htmlElement: HTMLElement) {
    super(htmlElement, async (ctx) => {
      const controls = useOrbitControls(ctx.camera, ctx.renderer.domElement)

      ctx.scene.environment = await loadEnvironment(5)

      const dimensions = ctx.renderer.getSize(new Vector2())

      ctx.composer.addPass(new SMAAPass(dimensions.x, dimensions.y))

      return {
        controls
      }
    })

    this.renderer.setClearColor(0x000000, 0)

    this.mesh = new HeartMesh(2000)
    this.scene.add(this.mesh)

    this.camera.near = 0.01
    this.camera.far = 1000
    this.camera.position.z = -5
    this.camera.updateProjectionMatrix()

    this.mesh.scatter(200)

    this.setupDebuggerPanes()
  }

  setupDebuggerPanes() {
    const pane = usePane()

    pane.addBinding(this.mesh.material as THREE.MeshPhysicalMaterial, 'roughness', {
      label: 'Roughness',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as THREE.MeshPhysicalMaterial, 'metalness', {
      label: 'Metalness',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as THREE.MeshPhysicalMaterial, 'sheen', {
      label: 'Sheen',
      min: 0,
      max: 1
    })

    pane.addBinding(this.mesh.material as THREE.MeshPhysicalMaterial, 'sheenRoughness', {
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
