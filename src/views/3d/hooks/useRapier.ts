import RAPIER from '@dimforge/rapier3d'

export const useRapier = () => {
  // Use the RAPIER module here.
  const gravity = { x: 0.0, y: -9.81, z: 0.0 }
  const world = new RAPIER.World(gravity)

  // Create the ground
  const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0)
  const groundCollider = world.createCollider(groundColliderDesc)

  groundCollider.setEnabled(true)
  groundColliderDesc.setRestitution(0)

  // Create a dynamic rigid-body.
  const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0.0, 5.0, 0.0)
  const rigidBody = world.createRigidBody(rigidBodyDesc)

  //   rigifBodyDesc.setTranslation(0.0, 5.0, 0.0)

  // Create a cuboid collider attached to the dynamic rigidBody.
  const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
  const collider = world.createCollider(colliderDesc, rigidBody)

  rigidBody.setRotation({ x: 4, y: 6, z: 0, w: 1 }, true)

  collider.setEnabled(true)

  return {
    world,
    groundCollider,
    groundColliderDesc,
    rigidBodyDesc,
    colliderDesc,
    rigidBody,
    collider
  }
}
