/**
 * # Object pool pattern
 *
 * @example
 *
 * ```ts
 * const pool = definePool(() => new Particle(), 100)
 * const particle = pool.get()
 *
 * await requestAnimationFrame()
 *
 * particle === pool.get()
 *
 * ```
 *
 * The object that is pooled waits for the next animation frame, and is then put back into the pool.
 *
 * Once the pool is full, the oldest object in the pool is reused. However the main idea is to have a pool that is large enough to avoid this.
 *
 *
 * @param ctor a constructor function or an instance of a class
 * @param size Pool size
 * @returns an instance of the class
 */
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
