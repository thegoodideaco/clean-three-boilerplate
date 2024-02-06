import { glbLoader } from '@/modules/loaders/gltfLoader'
import {
  Color,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshPhysicalMaterial,
  Object3D,
  Vector3
} from 'three'
import heartGlb from './heart.glb'
import { useSharedTicker } from '../hooks/useSharedTickerCallback'
import { DEG2RAD } from 'three/src/math/MathUtils.js'

export class HeartMesh extends InstancedMesh {
  /**
   * Used for updating the position of each particle (mesh instance)
   */
  private dummy = new Object3D()
  private colorDummy = new Color()
  private velocityDummy = new Object3D()
  private rotationAxisVector = new Vector3()
  private ticker = useSharedTicker()

  private emitterMatrixArray: Float32Array

  constructor(amount: number = 1000) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const material = new MeshPhysicalMaterial({
      metalness: 0.0,
      roughness: 0.5,
      sheenColor: new Color(0xff0000)
    })

    super(undefined, material, amount)

    this.emitterMatrixArray = new Float32Array(amount * 16)
    this.resetVelocityTransforms()

    this.instanceMatrix.setUsage(DynamicDrawUsage)

    /**
     * Create the color instance buffer attribute
     */
    const colors = new Float32Array(amount * 3)
    for (let i = 0; i < amount; i++) {
      this.colorDummy.setHSL(Math.random(), 1, 0.5)
      this.colorDummy.toArray(colors, i * 3)
    }
    this.instanceColor = new InstancedBufferAttribute(colors, 3, true)

    // this.geometry = new SphereGeometry(0.1, 5, 5)

    // this.material.wireframe = true

    glbLoader.load(heartGlb, (gltf) => {
      const geom = (gltf.scene.getObjectByProperty('isMesh', true) as THREE.Mesh)?.geometry

      if (geom) {
        const _scale = 0.25
        geom.scale(_scale, _scale, _scale)
        this.geometry = geom

        /**
         * For frustum culling
         */
        this.geometry.computeBoundingBox()
        this.geometry.computeBoundingSphere()

        this.computeBoundingBox()
        this.computeBoundingSphere()
      }

      // this.resetVelocityTransforms()
    })

    this.onBeforeRender = () => {
      this.tick()
    }
  }

  /**
   * This is where we want to update:
   * - position
   * - rotation
   * - scale
   * - velocity
   * - color
   * - angular velocity
   */
  tick() {
    for (let i = 0; i < this.count; i++) {
      // copy the current matrix iterated into our dummy
      this.dummy.matrix
        .fromArray(this.instanceMatrix.array, i * 16)
        .decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale)

      /**
       * Get the current velocity offset from the emitter matrix array
       */
      this.velocityDummy.matrix
        .fromArray(this.emitterMatrixArray, i * 16)
        .decompose(
          this.velocityDummy.position,
          this.velocityDummy.quaternion,
          this.velocityDummy.scale
        )

      this.rotationAxisVector
        .setFromEuler(this.velocityDummy.rotation)
        .multiplyScalar(this.ticker.speed)

      this.dummy.rotation.x += this.rotationAxisVector.x
      this.dummy.rotation.y += this.rotationAxisVector.y
      this.dummy.rotation.z += this.rotationAxisVector.z

      // get the rotation as Euler angles and place within the dummy vec3

      this.dummy.position.add(this.velocityDummy.position)

      // this.dummy.quaternion.multiply(this.velocityDummy.quaternion)
      // this.dummy.position.y += 2.5 * (this.ticker.deltaMS / 1000)

      if (this.dummy.position.y > 50) {
        this.dummy.position.y -= 100
      }

      this.dummy.updateMatrix()
      this.dummy.matrix.toArray(this.instanceMatrix.array, i * 16)
    }

    this.instanceMatrix.needsUpdate = true
  }

  scatter(size: number = 100) {
    for (let i = 0; i < this.count; i++) {
      const [rx, ry] = Array.from({ length: 2 }, () => MathUtils.randFloatSpread(size))

      const rScale = Math.random() * 10
      const rz = Math.random() * 10

      this.dummy.position.set(rx, ry, rz)
      this.dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )
      this.dummy.scale.set(rScale, rScale, rScale)

      this.dummy.updateMatrix()
      this.dummy.matrix.toArray(this.instanceMatrix.array, i * 16)
    }

    this.computeBoundingBox()
    this.computeBoundingSphere()

    this.instanceMatrix.needsUpdate = true
  }

  resetVelocityTransforms() {
    const mat = this.velocityDummy.matrix
    const maxRotation = 4 * DEG2RAD
    for (let i = 0; i < this.count; i++) {
      mat.makeTranslation(0, Math.random() * 5, 0)

      mat.decompose(
        this.velocityDummy.position,
        this.velocityDummy.quaternion,
        this.velocityDummy.scale
      )

      this.rotationAxisVector.setFromEuler(this.velocityDummy.rotation)

      this.velocityDummy.rotateX(Math.random() * maxRotation)
      this.velocityDummy.rotateY(Math.random() * maxRotation)
      this.velocityDummy.rotateZ(Math.random() * maxRotation)

      this.velocityDummy.matrix.compose(
        this.velocityDummy.position,
        this.velocityDummy.quaternion,
        this.velocityDummy.scale
      )

      // mat.makeRotationX(0.001)

      mat.toArray(this.emitterMatrixArray, i * 16)
    }
  }
}
