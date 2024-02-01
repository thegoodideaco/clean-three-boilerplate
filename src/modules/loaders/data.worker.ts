// import { DataTexture } from 'three'
import { RGBELoader, type RGBE } from 'three/addons/loaders/RGBELoader.js'
export const environmentLoader = new RGBELoader()

self.onmessage = async (event) => {
  const { data } = event

  switch (data.type) {
    case 'LOAD_DATA':
      console.log('dataWorker: LOAD_DATA', data)
      if (data.buffer && data.buffer instanceof ArrayBuffer) {
        const texData: RGBE = environmentLoader.parse(data.buffer)

        self.postMessage(
          { type: 'DATA_LOADED', data: texData },
          {
            transfer: [texData.data.buffer]
          }
        )
        return
      }

      if (data.path) {
        const envMap = await environmentLoader.loadAsync(data.path)
        envMap.name = data.path.slice(data.path.lastIndexOf('/') + 1, data.path.lastIndexOf('.'))
        envMap.mapping = 300
        envMap.generateMipmaps = true
        envMap.needsUpdate = true

        self.postMessage({ type: 'DATA_LOADED', data: envMap })
      }
      break
    default:
      break
  }
}
