import { Plane, shaderMaterial } from "@react-three/drei";
import {
  extend,
  type ShaderMaterialProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { FC, useRef } from "react";
import { ShaderMaterial } from "three";
import fragmentShader from "./backdropPlane.frag";
import vertexShader from "./backdropPlane.vert";

type Props = {};
type Uniforms = {};

const INITIAL_UNIFORMS: Uniforms = {};
const BackdropPlaneShader = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ BackdropPlaneShader });

const BackdropPlane: FC = () => {
  const { viewport } = useThree();

  const shader = useRef<ShaderMaterial & Partial<Uniforms>>(null);

  useFrame(({ clock }) => {
    if (!shader.current) return;
  });
  return (
    <Plane>
      <backdropPlaneShader />
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
