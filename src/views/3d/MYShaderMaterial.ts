import { Clock, DoubleSide, MeshPhongMaterial, ShaderMaterial } from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { Pane } from 'tweakpane'

console.log({
  vertexShader,
  fragmentShader
})

if (import.meta.env.DEV) {
  const backupMaterial = new MeshPhongMaterial()

  Object.assign(window, {
    backupMaterial
  })

  import('three').then((three) => {
    Object.assign(window, {
      THREE: three
    })
  })
}

export class MyShaderMaterial extends ShaderMaterial {
  clock: Clock = new Clock()
  pane?: MyShaderPane

  constructor() {
    const uniforms = {
      uTime: {
        value: 0.1
      },
      uScale: {
        value: 7
      },
      uThreshold: {
        value: 0.47
      },
      uRealTime: {
        value: 0
      }
    }

    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: DoubleSide,
      forceSinglePass: false
    })

    if (import.meta.env.DEV) {
      const pane = new MyShaderPane(this)

      pane.addBinding(this.uniforms.uTime, 'value', {
        min: 0,
        max: 1,
        label: 'Time'
      })

      pane.addBinding(this.uniforms.uScale, 'value', {
        min: 1,
        max: 100,
        label: 'Time Scale'
      })

      pane.addBinding(this.uniforms.uThreshold, 'value', {
        min: 0,
        max: 1,
        label: 'Threshold'
      })

      this.pane = pane
    }
  }

  onBeforeRender() {
    this.uniforms.uRealTime.value = this.clock.getElapsedTime()
    // console.log(this.uniforms.uTime.value)
  }

  dispose(): void {
    if (this.pane) {
      this.pane.dispose()
    }

    super.dispose()
  }
}

export class MyShaderPane extends Pane {
  constructor(material: MyShaderMaterial) {
    super({
      title: 'Shader',
      expanded: false
    })

    console.log(material)
  }
}
