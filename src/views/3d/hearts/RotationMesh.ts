import * as THREE from 'three';

export function createRandomTransformMatrix(matrix = new THREE.Matrix3()): THREE.Matrix3 {
   

    // Generate random values for the matrix elements
    const elements = [];
    for (let i = 0; i < 9; i++) {
        elements.push(Math.random());
    }

    // Set the matrix elements
    matrix.set(
        elements[0], elements[1], elements[2],
        elements[3], elements[4], elements[5],
        elements[6], elements[7], elements[8]
    );

    return matrix;
}

