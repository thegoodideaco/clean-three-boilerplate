import type { PerspectiveCamera } from 'three'

export function calculateCameraDistance(
  planeWidth: number,
  planeHeight: number,
  camera: PerspectiveCamera,
  fitOutside: boolean
): number {
  const fov = camera.fov * (Math.PI / 180)
  const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect)
  const dx = 0 + Math.abs(planeWidth / 2 / Math.tan(fovh / 2))
  const dy = 0 + Math.abs(planeHeight / 2 / Math.tan(fov / 2))
  const cameraZ = fitOutside ? Math.min(dx, dy) : Math.max(dx, dy)

  return cameraZ
}

export function getPixelScaleFromCameraDistance(
  cameraDistance: number,
  camera: PerspectiveCamera
): number {
  const fov = camera.fov * (Math.PI / 180)
  const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect)
  const dx = 0 + Math.abs(cameraDistance * Math.tan(fovh / 2))
  const dy = 0 + Math.abs(cameraDistance * Math.tan(fov / 2))
  const pixelScale = Math.max(dx, dy)

  return pixelScale
}
