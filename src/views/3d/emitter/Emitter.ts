import * as THREE from 'three'

export class Emitter {
  private geometry: THREE.BufferGeometry
  private material: THREE.Material
  private mesh: THREE.Mesh
  private matrix: THREE.Matrix4

  constructor() {
    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.matrix = new THREE.Matrix4()
  }

  public emit(_position: THREE.Vector3, _rotation: THREE.Vector3, _scale: THREE.Vector3) {
    // this.matrix.compose(position, rotation, scale);
    this.geometry.applyMatrix4(this.matrix)
    // this.instanceMatrix.needsUpdate = true;
  }
}
