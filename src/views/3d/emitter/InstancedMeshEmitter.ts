import type { InstancedMesh } from 'three'

export class instancedMeshEmitter {
  instancedMesh: InstancedMesh

  constructor(mesh: InstancedMesh) {
    this.instancedMesh = mesh
  }
}
