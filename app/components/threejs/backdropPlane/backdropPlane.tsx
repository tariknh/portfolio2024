import { Plane, shaderMaterial } from "@react-three/drei";
import {
  extend,
  type ShaderMaterialProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useRef } from "react";
import { Color, ShaderMaterial } from "three";
import fragmentShader from "./backdropPlane.frag";
import vertexShader from "./backdropPlane.vert";

type Props = {};
type Uniforms = {
  uTime: number;
  uLightColor: Color;
  uDarkColor: Color;
  uNoiseModifier: number;
};

const INITIAL_UNIFORMS: Uniforms = {
  uTime: 0,
  uLightColor: new Color("#D9EAFD"),
  uDarkColor: new Color("#31363F"),
  uNoiseModifier: 5,
};
const BackdropPlaneShader = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ BackdropPlaneShader });

const BackdropPlane: FC = () => {
  const { viewport } = useThree();

  const shader = useRef<ShaderMaterial & Partial<Uniforms>>(null);

  const { noiseModifier } = useControls({
    noiseModifier: { value: 5, min: 0, max: 25 },
  });

  useFrame(({ clock, pointer }) => {
    if (!shader.current) return;

    shader.current.uTime = clock.elapsedTime;
    shader.current.uNoiseModifier = noiseModifier;
  });
  return (
    <Plane args={[viewport.width, viewport.height, 1, 1]} position={[0, 0, 0]}>
      <backdropPlaneShader
        key={BackdropPlaneShader.key}
        ref={shader}
        uTime={0}
        uNoiseModifier={INITIAL_UNIFORMS.uNoiseModifier}
        uDarkColor={INITIAL_UNIFORMS.uDarkColor}
        uLightColor={INITIAL_UNIFORMS.uLightColor}
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

export default BackdropPlane;
