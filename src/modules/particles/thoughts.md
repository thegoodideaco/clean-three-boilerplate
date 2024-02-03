# Particle System

## Overview

In simple terms, a particle system is a way of simulating and rendering a large number of smaller items over time, like 2D images (or 3D models) in a scene. It is designed to be efficient with large numbers of objects, and to make it easy to animate properties like position, rotation, and scale.

We want the particle system to be as flexible as possible, so that it can be used for a wide variety of effects. We do not want to limit it's use case, so we will try to make it as generic as possible.

## Design thoughts

- We want to avoid making particles indivudually as objects. They would fill up memory and be slow to render.

- A particle has a state of values that change over time, which means that a particle is entirely made of numbers in order to interpolate between states.
- The values that change over time are due to them being effected by something, like gravity, or a force, or a velocity, or a rotation, etc...
  - We want to be able to define these forces and effects in a generic way, so that we can reuse them for different effects, or combine them together.
  - We also want to control how much each effect is applied to a particle, so that we can have a particle that is effected by gravity, but not by wind, for example.

## Approach

a set of particles will be stored in a single array buffer. By default it will be a Float32Array.

We must define the maximum number of particles that can be rendered at once to create the array buffer. This is because we cannot resize an array buffer, so we must create a new one if we want to change the max number of particles.

When a particle is emitted, we will pull it from the array buffer, and add it to a pool of active particles.

An initial effect is then applied to initialize the particle's state. the state get effected by each effect, and then an optional final effect is applied to the particle before going back into the pool

Emitting a particle when the pool is empty will either cancel the emit, or recycle the oldest particle.

After each frame, we loop thru the objects pulled from the pool, and put back any that are no longer alive based on their lifetime. We can stop looping once we reach the first particle that is still alive.

Each 'particle' will consist of a subset of values for each effect that is applied to it.

For example, a particle that is effected by gravity and wind will have `position`, `velocity`, and `acceleration` for **gravity**, and `position`, `velocity`, and `acceleration` for **wind**.

Each effect will transform the particle's state one by one before finally being applied to the main array buffer, and will be applied again at each frame.

In order to do object pooling, we will need to keep track of which particles are active and which are not. We can do this by having a separate array of indices that point to the active particles index in the main array buffer, as well as the time that the particle was emitted.

Ultimately we want the particle system at it's core, to handle particles as a single array buffer, and to apply effects to the particles in a generic way that can update the main array buffer without the need to create particles as objects.

The user can then define their own effects, and apply them to the particle system.

The particle system should be in charge of:

- timing and speed
- object pooling
- applying effects that modify one or more array buffers

The user should be in charge of:

- defining the particle
- defining the effects
- defining the array buffer(s) that the effects will be applied to

We should be able to create extended particle systems that have their own effects, and used as a base for other particle systems types.

For example, Point and instanced meshes can be used as particles, and we can create a particle system that controls a point mesh, and another that controls an instanced mesh. Each one implements bufferAttributes, and the particle system can apply effects to them the same way.

In other cases, we may be creating particle objects in memory, but it's still efficient since the particle objects can be recycled to reference a different particle in the same array buffer. This means that if the max cap of particles is 1000, but you're only showing 10-20 particles at any given time, there will only be 10-20 particle objects created in memory.
