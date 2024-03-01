import { MathUtils } from 'three'
import { LUTCubeLoader, LUT3dlLoader, LUTPass } from 'three/examples/jsm/Addons.js'

export const lutPaths = Object.values(
  import.meta.glob(
    ['/src/assets/luts/*.(cube|CUBE|3dl)', '/src/assets/luts/**/*.(cube|CUBE|3dl)'],
    {
      eager: true,
      query: '?url',
      import: 'default'
    }
  )
) as string[]

export const lutLoader = new LUT3dlLoader()
export const lutLoader3d = new LUTCubeLoader()

export const lutPass = new LUTPass({
  intensity: 1.0
})

export async function load(src: string | number | undefined = lutPaths[0]) {
  const path =
    typeof src === 'number'
      ? lutPaths[MathUtils.euclideanModulo(src, lutPaths.length)]
      : src || lutPaths[0]

  const isCube = path.toLowerCase().endsWith('.cube')
  const loader = isCube ? lutLoader3d : lutLoader

  const lut = await loader.loadAsync(path)

  lutPass.lut = lut.texture3D || lut.texture

  return lut
}

export function loadRandom() {
  return load(Math.floor(Math.random() * lutPaths.length))
}
