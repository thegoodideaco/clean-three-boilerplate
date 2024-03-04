import { BufferGeometry, Material, Mesh, Matrix4, MeshBasicMaterial, Vector3 } from 'three'

export class Emitter {
  private geometry: BufferGeometry
  private material: Material
  private mesh: Mesh
  private matrix: Matrix4

  constructor() {
    this.geometry = new BufferGeometry()
    this.material = new MeshBasicMaterial({ color: 0xff0000 })
    this.mesh = new Mesh(this.geometry, this.material)
    this.matrix = new Matrix4()
  }

  public emit(_position: Vector3, _rotation: Vector3, _scale: Vector3) {
    // this.matrix.compose(position, rotation, scale);
    this.geometry.applyMatrix4(this.matrix)
    // this.instanceMatrix.needsUpdate = true;
  }
}
