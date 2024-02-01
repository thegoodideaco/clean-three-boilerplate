export class ParticleEmitter {
  static MAX_PARTICLES = 1000

  private particleData: Float32Array
  private transformData: Float32Array
  particles: any[] = []

  constructor(maxSize: number = 1000) {
    /**
     * Single array to store the transform matrix for each particle
     */
    this.particleData = new Float32Array(maxSize * 16)

    /**
     * Single array to store the incremental transform matrix for each particle
     */
    this.transformData = new Float32Array(maxSize * 16)

    this.#init()
  }
  #init() {
    this.particles = []
  }
  emit() {
    const particle = {}
    this.particles.push(particle)
    return particle
  }
}
