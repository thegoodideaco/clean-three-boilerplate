varying vec3 vPos;
varying vec2 vUv;
void main() {
    // Transform the vertex position
    vPos = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
