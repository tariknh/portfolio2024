#pragma glslify: cnoise = require('./perlin3dNoise.glsl')

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;

varying vec2 vUv;
uniform vec2 uPrevMouse; // Previous mouse position
uniform vec2 uMouse; // Normalized mouse position


void main()
{
    vec2 uv = vUv;

    // Displace the UV
    vec2 displacedUv = vUv + cnoise(vec3(uv * 5.0, uTime * 0.1));
    // Perlin noise
    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2 ));

    // Ripple effect parameters
    vec2 rippleCenter = uMouse; // Normalized mouse coordinates (0 to 1)
    float distanceFromMouse = distance(vUv, rippleCenter);

    // Ripple effect calculation (sine wave applied based on distance from the mouse)
    float ripple = 0.03 * sin(20.0 * distanceFromMouse - uTime * 2.0) / distanceFromMouse;

    // Adjust UV coordinates to apply the ripple distortion
    uv.x += ripple * 0.1; // Distort the UVs horizontally
    uv.y += ripple * 0.1; // Distort the UVs vertically

    // Radial gradient
    float radialGradient = distance(vUv, vec2(0.5)) * 12.5 - 7.0 * uProgress;
    strength += radialGradient;

    // Clamp the value from 0 to 1 & invert it
    strength = clamp(strength, 0.0, 1.0);
    strength = 1.0 - strength;

    // Apply texture
    vec3 textureColor = texture2D(uTexture, uv).rgb;

     // Opacity animation
    float opacityProgress = smoothstep(0.0, 0.7, uProgress);
    

    // FINAL COLOR
    gl_FragColor = vec4(textureColor, strength * opacityProgress);
}

