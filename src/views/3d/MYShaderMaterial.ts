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
}

const clock = new Clock()

export class MyShaderMaterial extends ShaderMaterial {
  constructor() {
    const uniforms = {
      uTime: {
        value: clock.getElapsedTime()
      },
      uScale: {
        value: 1
      }
    }

    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: DoubleSide
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
    }
  }

  onBeforeRender() {
    // this.uniforms.uTime.value = clock.getElapsedTime()
    // console.log(this.uniforms.uTime.value)
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
