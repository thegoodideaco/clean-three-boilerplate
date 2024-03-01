import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

import DataWorker from './data.worker.ts?worker'
import { AppLoaderManager } from './Manager'

export const environmentLoader = new RGBELoader(AppLoaderManager)
const dataWorker = new DataWorker()

export const hdrPaths = Object.values(
  import.meta.glob(['/src/**/*.hdr', '/src/**/**/*.hdr'], {
    eager: true,
    query: '?url',
    import: 'default'
  })
) as string[]

/**
 *
 * @param path the path to the hdr file, index of the hdrPaths array or undefined to load the first one
 */
export async function loadEnvironment(path: string | number | undefined = hdrPaths[0]) {
  let _path: string

  if (typeof path === 'number') {
    _path = hdrPaths[path % hdrPaths.length]
  } else {
    _path = path || hdrPaths[0]
  }

  const envMap = await environmentLoader.loadAsync(_path)

  envMap.name = _path.slice(_path.lastIndexOf('/') + 1, _path.lastIndexOf('.'))

  envMap.mapping = EquirectangularReflectionMapping
  envMap.generateMipmaps = true
  // envMap.colorSpace = SRGBColorSpace

  envMap.needsUpdate = true

  return envMap
}

export function loadEnvironmentWithWorker(
  path: string | number | ArrayBuffer | undefined = hdrPaths[0]
) {
  let _path: string

  let buffer: ArrayBuffer | undefined

  if (path instanceof ArrayBuffer) {
    buffer = path
  } else if (typeof path === 'number') {
    _path = hdrPaths[path % hdrPaths.length]
  } else {
    _path = path || hdrPaths[0]
  }

  return new Promise((resolve, reject) => {
    try {
      dataWorker.postMessage({ type: 'LOAD_DATA', path: _path, buffer })

      dataWorker.onmessage = (event) => {
        const { data } = event

        switch (data.type) {
          case 'DATA_LOADED':
            resolve(data.data)
            break
          default:
            break
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}
