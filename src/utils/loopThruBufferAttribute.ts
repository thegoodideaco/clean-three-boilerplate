import { type BufferAttribute } from 'three'

/**
 * Utility function to loop through a BufferAttribute
 *
 * @param attribute
 * @param callback
 */
export function loopThruBufferAttribute(
  attribute: BufferAttribute,
  callback: (
    chunk: typeof attribute.array,
    index: number,
    strideIndex: number
  ) => typeof attribute.array | void
) {
  const array = attribute.array
  const stride = attribute.itemSize
  const count = attribute.count
  const chunkedArray = attribute.array.slice(0, stride)

  for (let i = 0; i < count; i++) {
    const index = i * stride

    chunkedArray.set(array.slice(index, index + stride), 0)

    const val = callback(chunkedArray, i, index)

    /**
     * If the callback returns a value, we set it back into the array
     */
    if (val && Array.isArray(val)) {
      attribute.set(val, index)
    }
  }

  attribute.needsUpdate = true

  return attribute
}
