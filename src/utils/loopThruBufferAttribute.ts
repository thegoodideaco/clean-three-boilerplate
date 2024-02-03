import type { BufferAttribute } from 'three'

/**
 * Utility function to loop through a BufferAttribute
 *
 * @param attribute
 * @param callback
 */
export function loopThruBufferAttribute(
  attribute: BufferAttribute,
  callback: (chunk: typeof attribute.array, index: number, stride: number) => void
) {
  const array = attribute.array
  const stride = attribute.itemSize
  const count = attribute.count

  for (let i = 0; i < count; i++) {
    const index = i * stride

    const chunkedArray = attribute.array.slice(index, index + stride)

    callback(chunkedArray, i, stride)
  }
}
