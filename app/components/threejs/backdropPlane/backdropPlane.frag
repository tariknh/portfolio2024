#pragma glslify: noise = require('glsl-noise/simplex/3d')
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uPrevMouse;
uniform float uNoiseModifier;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;
uniform sampler2D uTexture;
uniform float uAspectRatio;

vec4 linearToSRGB(in vec4 value) {
    vec3 linearRGB = value.rgb;
    vec3 sRGB = mix(
        pow(linearRGB, vec3(1.0 / 2.4)) * 1.055 - vec3(0.055),
        linearRGB * 12.92,
        vec3(lessThanEqual(linearRGB, vec3(0.0031308)))
    );
    return vec4(sRGB, value.a);
}


void main() {

    

    vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
    vec2 mouseDirection = uMouse - uPrevMouse;
    vec2 pixelToMouseDirection = centerOfPixel - uMouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * - mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    //vec2 colorR = (uLightColor, uDarkColor );
    
    float noiseValue = noise(vec3(uv.x * uNoiseModifier, uv.y * uNoiseModifier, uTime * 0.1 ));
    vec3 noiseColor = mix(uLightColor, uDarkColor, noiseValue);

    vec2 textureUv = uv;
    textureUv.x *= uAspectRatio;
    textureUv = fract(textureUv);
    vec4 textureColor = texture2D(uTexture, textureUv);
    textureColor = linearToSRGB(textureColor);

    vec4 finalColor = mix(vec4(noiseColor, 1.0), textureColor, 0.12);

    

    

    //gl_FragColor = textureColor;
    gl_FragColor = finalColor;


    

}