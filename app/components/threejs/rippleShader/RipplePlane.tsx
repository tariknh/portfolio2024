import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
import {
  extend,
  type ShaderMaterialProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useRef } from "react";
import { Color, ShaderMaterial, Texture, Vector2 } from "three";
import fragmentShader from "./backdropPlane.frag";
import vertexShader from "./backdropPlane.vert";
import textureImg from "./textureImg.jpg"
type Props = {};
type Uniforms = {
  uAspectRatio: number;
  uTime: number;
  uLightColor: Color;
  uDarkColor: Color;
  uNoiseModifier: number;
  uMouse: Vector2;
  uPrevMouse: Vector2;
  uTexture: Texture | null;
};

const INITIAL_UNIFORMS: Uniforms = {
  uAspectRatio: 1,
  uTime: 0,
  uMouse: new Vector2(),
  uPrevMouse: new Vector2(),
  uLightColor: new Color("#3CA6A6"),
  uDarkColor: new Color("#034159"),
  uNoiseModifier: 5,
  uTexture: null
};
const BackdropPlaneShader = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ BackdropPlaneShader });

const RipplePlane: FC = () => {
  
  const texture = useTexture(textureImg.src)
  const { viewport } = useThree();
  const previousMouse = useRef(new Vector2());

  const shader = useRef<ShaderMaterial & Partial<Uniforms>>(null);

  const { noiseModifier } = useControls({
    noiseModifier: { value: 5, min: 0, max: 25 },
  });

  const targetMousePosition = useRef(new Vector2(0.0, 0.0));
  const easeFactor = 0.02

  useFrame(({ clock, pointer }) => {
    if (!shader.current) return;
  
    // Normalize pointer coordinates
    const currentMouse = new Vector2(
      (pointer.x + 1) / 2, // Normalize to [0, 1]
      (pointer.y + 1) / 2
    );
  
    // Set uniforms
    shader.current.uTime = clock.elapsedTime;
    shader.current.uMouse!.set(currentMouse.x, currentMouse.y);
    shader.current.uPrevMouse!.set(previousMouse.current.x, previousMouse.current.y);
  
    // Update previous mouse for the next frame
    previousMouse.current.copy(currentMouse);
  });
  return (
    <Plane args={[viewport.width, viewport.height, 1, 1]} position={[0, 0, 0]}>
      <backdropPlaneShader
        key={BackdropPlaneShader.key}
        ref={shader}
        uTime={0}
        uAspectRatio={viewport.aspect}
        uNoiseModifier={INITIAL_UNIFORMS.uNoiseModifier}
        uDarkColor={INITIAL_UNIFORMS.uDarkColor}
        uLightColor={INITIAL_UNIFORMS.uLightColor}
        uMouse={INITIAL_UNIFORMS.uMouse}
        uPrevMouse={INITIAL_UNIFORMS.uPrevMouse}
        uTexture={texture}
      />
    </Plane>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      backdropPlaneShader: ShaderMaterialProps & Uniforms;
    }
  }
}

export default RipplePlane;
