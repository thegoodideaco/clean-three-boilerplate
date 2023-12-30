import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { Pane } from 'tweakpane'

console.log({
  vertexShader,
  fragmentShader
})

const clock = new THREE.Clock()

export class MyShaderMaterial extends THREE.ShaderMaterial {
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
      side: THREE.DoubleSide
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
        max: 10,
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
