import { MeshStandardMaterial, type MeshStandardMaterialParameters } from 'three'

import vertShader from './shaders/standardVert.vert'
import fragShader from './shaders/standardFrag.frag'

export class MyCustomStandardMaterial extends MeshStandardMaterial {
  _shader: any = {}
  uniforms: any = {}
  constructor(parameters?: MeshStandardMaterialParameters) {
    super(parameters)

    super.onBeforeCompile = (shader) => {
      this._shader = shader
      this.uniforms = shader.uniforms
      shader.vertexShader = vertShader
      shader.fragmentShader = fragShader

      shader.uniforms.uTime = {
        value: 0
      }
    }
  }

  onBeforeRender() {
    if (!this.uniforms.uTime) {
      return
    }
    this.uniforms.uTime.value += 0.01
  }
}
