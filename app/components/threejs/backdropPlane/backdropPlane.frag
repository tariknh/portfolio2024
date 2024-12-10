#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform float uTime;
uniform float uNoiseModifier;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;
varying vec2 vUv;

void main() {
    
    vec3 colourA = vec3(.5,.5,5);
    vec3 colourB = vec3(.0,.0,.0);
    float noiseValue = noise(vec3(vUv.x * uNoiseModifier, vUv.y * uNoiseModifier, uTime * .1 ));
    vec3 finalColour = mix(uLightColor, uDarkColor, noiseValue);
    
    gl_FragColor = vec4(finalColour, 1); // Default white color


}