#pragma glslify: cnoise = require('glsl-noise/classic/3d')

#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

uniform float uTime;
void main() {
    #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = -mvPosition.xyz;
#endif
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>

	float nx = cnoise(vec3(transformed) + (uTime * .6)) * 1.5;
	float ny = cnoise(vec3(transformed.yyy) + (uTime * .1));
	float nz = cnoise(vec3(transformed.zzz) + (uTime * .1));

	transformed += nx * .3;
	vNormal += nx * .3;

    #include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <clipping_planes_vertex>
}