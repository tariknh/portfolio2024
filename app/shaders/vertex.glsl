// vertex.glsl
varying vec2 vUv;
uniform float uProgress;
void main()
{
  // VARYINGS
  vUv = uv;
  // FINAL POSITION
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}