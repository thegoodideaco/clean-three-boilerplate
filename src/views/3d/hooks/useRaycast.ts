import layerMasks from '@/utils/layer-masks'
import {
  Object3D,
  Raycaster,
  Vector2,
  type Object3DEventMap,
  type Intersection,
  PerspectiveCamera,
  Camera,
  Scene
} from 'three'
import { toValue, type MaybeRef, computed, reactive, ref, watch, shallowRef } from 'vue'

export interface UseRaycastOptions {
  /**
   * If true, the raycaster will automatically cast a ray from the camera to the mouse.
   */
  autoCast?: boolean
  enabled?: boolean
  filter?: (object: Object3D) => boolean
  layerMask?: number
  maxDistance?: number
  recursive?: boolean
  sort?: boolean
  threshold?: number
  useTree?: boolean
  useTriangleMatrices?: boolean
  useMeshMatrices?: boolean
  useTextureMatrices?: boolean
  useGeometryMatrices?: boolean
  useLineSegments?: boolean
  usePoints?: boolean
  useSprites?: boolean
  useLoops?: boolean
  useEdges?: boolean
}

/**
 * Hook to deliver raycasting functionality.
 * @param options
 */
export function useRaycast(
  camera: MaybeRef<Camera>,
  target: MaybeRef<Scene | Object3D>,
  x: MaybeRef<number>,
  y: MaybeRef<number>,
  options?: UseRaycastOptions
) {
  const {
    recursive = true,
    autoCast = false,
    layerMask = layerMasks.RAYCAST,
    enabled = true,
    maxDistance = Infinity
  } = (options || {}) as UseRaycastOptions

  // ...
  const raycaster = new Raycaster()
  Object.assign(raycaster, {
    firstHitOnly: true
  })

  raycaster.layers.enable(layerMask)

  const mouse = computed(() => ({ x: toValue(x), y: toValue(y) }))
  const mouseVector = reactive(new Vector2(mouse.value.x, mouse.value.y))

  const _xRef = ref(x)
  const _yRef = ref(y)

  watch([_xRef, _yRef], () => {
    if (!autoCast) return

    cast()
  })

  /**
   * Update raycaster of camera changes.
   */
  const cameraRef = shallowRef(camera)
  watch(cameraRef, (v) => {
    if (!v) return
    raycaster.setFromCamera(mouseVector, v)
  })

  const targetRef = shallowRef(target)
  const intersectedRef = shallowRef<Intersection<Object3D<Object3DEventMap>>[]>([])
  const maxDistanceRef = ref(maxDistance)

  watch(targetRef, (v) => {
    if (!(v || autoCast)) return
    raycaster.intersectObject(v, recursive, intersectedRef.value)
  })

  function cast(
    x = mouse.value.x,
    y = mouse.value.y,
    target = targetRef,
    maxDistance = maxDistanceRef
  ) {
    const _camera = toValue(camera)
    const _target = toValue(target)
    const _maxDistance = toValue(maxDistance)

    const intersected = toValue(intersectedRef)

    mouseVector.set(x, y)

    if (camera) {
      raycaster.setFromCamera(mouseVector, _camera)

      if (_camera instanceof PerspectiveCamera) {
        raycaster.far = Math.min(_maxDistance, _camera.far)
      }
    }

    intersectedRef.value = raycaster.intersectObject(_target, recursive)

    // raycaster.far = toValue(maxDistance) || Infinity
    intersected.length = 0
    const intersect = intersectedRef.value[0] as
      | undefined
      | Intersection<Object3D<Object3DEventMap>>

    return intersect
  }

  const intersect = computed(() => intersectedRef.value[0])

  return {
    mouse,
    cast,
    enabled: ref(enabled),
    intersect,
    get activeItem() {
      return intersect.value
    },
    get activeObject() {
      return intersect.value?.object
    },
    get activePoint() {
      return intersect.value?.point
    },
    get activeFace() {
      return intersect.value?.face
    },
    get activeFaceIndex() {
      return intersect.value?.faceIndex
    },
    get activeDistance() {
      return intersect.value?.distance
    },
    get activePointWorld() {
      return intersect.value?.point
    },
    get activeFaceNormal() {
      return intersect.value?.face?.normal
    },
    get raycaster() {
      return raycaster
    }
  }
}
