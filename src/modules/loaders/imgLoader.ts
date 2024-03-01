import { ImageLoader } from 'three'

export const hdrPaths = Object.values(
  import.meta.glob(['/src/**/*.(png|jpg)', '/src/**/**/*.(png|jpg)'], {
    eager: true,
    query: '?url',
    import: 'default'
  })
) as string[]

export const imgLoader = new ImageLoader()
