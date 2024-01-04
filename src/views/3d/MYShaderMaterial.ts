import { Clock, FrontSide, MeshPhongMaterial, ShaderMaterial } from 'three'

import vertexShader from './shaders/normalVert.vert'
import fragmentShader from './shaders/normalFrag.frag'
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
      diffuse: {
        value: 16777215
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      mapTransform: {
        value: {
          elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: {
          elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
      },
      alphaTest: {
        value: 0
      },
      bumpMap: {
        value: null
      },
      bumpMapTransform: {
        value: {
          elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
      },
      bumpScale: {
        value: 1
      },
      normalMap: {
        value: null
      },
      normalMapTransform: {
        value: {
          elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
      },
      normalScale: {
        value: {
          x: 1,
          y: 1
        }
      },
      displacementMap: {
        value: null
      },
      displacementMapTransform: {
        value: {
          elements: [1, 0, 0, 0, 1, 0, 0, 0, 1]
        }
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      },
      clippingPlanes: {
        value: null,
        needsUpdate: false
      },
      uTime: {
        value: 0
      }
    }

    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: FrontSide,
      forceSinglePass: false
    })

    if (import.meta.env.DEV) {
      const pane = new MyShaderPane(this)

      this.pane = pane
    }
  }

  onBeforeRender() {
    this.uniforms.uTime.value = this.clock.getElapsedTime()
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
      expanded: true
      // container: document.body
    })

    console.log(material)
  }
}
