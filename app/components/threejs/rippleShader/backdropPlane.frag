precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uMouse; // Normalized mouse position
uniform vec2 resolution; // Resolution of the viewport
uniform float uTime; // Time for animation
uniform int frame; // Frame number for animation
varying vec2 vUv; // The current UV coordinates of the fragment
uniform vec2 uPrevMouse; // Previous mouse position

const float delta = 1.4;

void main() {
    vec2 uv = vUv;

    // Ripple effect parameters
    vec2 rippleCenter = uMouse; // Normalized mouse coordinates (0 to 1)
    float distanceFromMouse = distance(vUv, rippleCenter);

    // Ripple effect calculation (sine wave applied based on distance from the mouse)
    float ripple = 0.03 * sin(20.0 * distanceFromMouse - uTime * 2.0) / distanceFromMouse;

    // Adjust UV coordinates to apply the ripple distortion
    uv.x += ripple * 0.1; // Distort the UVs horizontally
    uv.y += ripple * 0.1; // Distort the UVs vertically

    // Sample the texture with the modified UV coordinates
    vec4 textureColor = texture2D(uTexture, uv);

    // Output color (combine texture color with ripple effect)
    gl_FragColor = textureColor;
}
