import { toValue, type MaybeRef } from 'vue'
import {
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast,
  MeshBVHHelper,
  SAH
} from 'three-mesh-bvh'
import { Scene, Object3D, BufferGeometry, Mesh } from 'three'

export function useBvhRaycasting(target: MaybeRef<Scene | Object3D>) {
  console.log(target)

  const _target = toValue(target)

  const _geoms = new WeakSet<BufferGeometry>()

  _target.traverse((obj) => {
    if (obj instanceof Mesh) {
      Object.assign(obj, {
        raycast: acceleratedRaycast
      })

      if (obj.geometry instanceof BufferGeometry && !_geoms.has(obj.geometry)) {
        // obj.geometry.applyMatrix4(obj.matrixWorld)
        // obj.matrix.identity().decompose(obj.position, obj.quaternion, obj.scale)
        // obj.updateMatrix()

        Object.assign(obj.geometry, {
          computeBoundsTree,
          disposeBoundsTree
        })

        computeBoundsTree.call(obj.geometry, {
          strategy: SAH,
          setBoundingBox: false,
          useSharedArrayBuffer: false,
          verbose: true
        })

        _geoms.add(obj.geometry)

        const bvhHelper = createBvhHelper(obj)
        bvhHelper.visible = false
        obj.add(bvhHelper)
      }
    }
  })

  return target
}

function createBvhHelper(obj: Mesh) {
  const bvhHelper = new MeshBVHHelper(obj, 0xff00ff)
  bvhHelper.depth = 20
  bvhHelper.edgeMaterial.color.set('orange')
  bvhHelper.displayParents = true
  // bvhHelper.edgeMaterial.depthTest = false
  bvhHelper.raycast = () => []
  return bvhHelper
}
