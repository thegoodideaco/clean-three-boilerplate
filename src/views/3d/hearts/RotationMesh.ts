import { Matrix3 } from 'three'

/**
 * Create a random transform matrix.
 *
 * @param matrix - The matrix to set the random values to. If none is provided, a new matrix will be created.
 * @returns The matrix with random values.
 */
export function createRandomTransformMatrix(matrix = new Matrix3()): Matrix3 {
  // Generate random values for the matrix elements
  const elements = []
  for (let i = 0; i < 9; i++) {
    elements.push(Math.random())
  }

  // Set the matrix elements
  matrix.set(
    elements[0],
    elements[1],
    elements[2],
    elements[3],
    elements[4],
    elements[5],
    elements[6],
    elements[7],
    elements[8]
  )

  return matrix
}
