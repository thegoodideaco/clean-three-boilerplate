#pragma glslify: cnoise = require('glsl-noise/classic/3d')

precision mediump float;
varying vec3 vPos;
varying vec2 vUv;

uniform float uTime;
uniform float uScale;
uniform float uThreshold;
uniform float uRealTime;

void main() {
    float n = cnoise(vec3(vUv.xy, 1.) * (uTime * uScale));

    vec3 p = (vPos * uScale);
    p.y += uRealTime * (uTime * uScale);
    n = cnoise(p);

    float alpha = smoothstep(uThreshold, n, 1. - n);

    if(alpha == 0.)
        discard;

    gl_FragColor = vec4(normalize(.5 - vPos) + .5, alpha);
}