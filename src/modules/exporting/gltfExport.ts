import type { Scene } from 'three'
import { GLTFExporter } from 'three/examples/jsm/Addons.js'
import { downloadFile } from '.'

const exporter = new GLTFExporter()

export async function exportGlb(scene: Scene, name: string = scene.name || scene.uuid) {
  const gltf = (await exporter.parseAsync(scene, {
    binary: true,
    includeCustomExtensions: true
  })) as ArrayBuffer

  name = name.endsWith('.glb') ? name : `${name}.glb`

  downloadFile(gltf, name, 'model/gltf-binary')

  return gltf
}
