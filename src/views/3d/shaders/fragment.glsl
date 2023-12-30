#pragma glslify: cnoise = require('glsl-noise/classic/3d')

precision mediump float;
varying vec3 vPos;
varying vec2 vUv;

uniform float uTime;
uniform float uScale;

void main() {
    float n = cnoise(vec3(vUv.xy, 1.) * (uTime * uScale));
    vec3 p = normalize(vPos);

    float alpha = smoothstep(.1, .7, 1. - pow(abs(p.xy * -.5).y, 1.));

    gl_FragColor = vec4((vUv.xy) * .5, n, alpha);
}