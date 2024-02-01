import { GLTFExporter } from 'three/examples/jsm/Addons.js'

const exporter = new GLTFExporter()

export async function exportGlb(scene: THREE.Scene, name: string = scene.name || scene.uuid) {
  const gltf = await exporter.parseAsync(scene, { binary: true, includeCustomExtensions: true,  }) as ArrayBuffer

  const blob = new Blob([gltf], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = name + '.glb'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return gltf
}
