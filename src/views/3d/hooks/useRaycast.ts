import { Object3D, Raycaster, Vector2 } from 'three'

type UseRaycastOptions = {
  autoUpdate?: boolean
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
export function useRaycast(options?: UseRaycastOptions) {
  const {
    autoUpdate,
    enabled,
    filter,
    layerMask,
    maxDistance,
    recursive,
    sort,
    threshold,
    useTree,
    useTriangleMatrices,
    useMeshMatrices,
    useTextureMatrices,
    useGeometryMatrices,
    useLineSegments,
    usePoints,
    useSprites,
    useLoops,
    useEdges
  } = options || {}

  // ...
  const raycaster = new Raycaster()
  const mouse = new Vector2()
}
