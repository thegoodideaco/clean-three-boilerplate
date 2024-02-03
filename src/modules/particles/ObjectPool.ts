export function definePool<T>(ctor: T | ((...args: any) => T), size: number = 100) {
  const pool = new Array<T>()

  const maxSize = size

  let _index = 0

  function create() {
    if (pool.length < maxSize) {
      if (ctor instanceof Function) {
        return new ctor.prototype.constructor() as T
      } else {
        return ctor as T
      }
    } else {
      return pool[_index++ % maxSize]
    }
  }

  function get() {
    const item = create()
    // pool.shift(item)
    return item
  }

  return {
    get
  }
}

export const poolTest = definePool(() => Math.random(), 100)
