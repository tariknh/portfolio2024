"use client";
import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { extend, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useRef } from "react";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import imageRevealFragmentShader from "../shaders/fragment.glsl";
import imageRevealVertexShader from "../shaders/vertex.glsl";

interface RevealImageProps {
  imageTexture: string;
  meshRef?: React.RefObject<THREE.Mesh>;
  rotationZ?: number;

  positionX?: any;
}

const ImageRevealMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uProgress: 0,
    uTime: 0,
  },
  imageRevealVertexShader,
  imageRevealFragmentShader,
  (self) => {
    self!.transparent = true;
  }
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageRevealMaterial: ShaderMaterialProps;
      uTexture: THREE.Texture;
    }
  }
}

extend({ ImageRevealMaterial });

const RevealImage: FC<RevealImageProps> = ({
  imageTexture,
  meshRef,
  positionX,
  rotationZ,
}) => {
  const materialRef = useRef<
    ShaderMaterial & { uTexture: THREE.Texture; uTime: any; uProgress: any }
  >(null);

  // LOADING TEXTURE & HANDLING ASPECT RATIO
  const texture = useTexture(imageTexture, (loadedTexture) => {
    if (materialRef.current) {
      materialRef.current.uTexture = loadedTexture;
    }
  });
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.6);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      materialRef.current.uProgress = revealProgress;
    }
  });

  const { revealProgress } = useControls({
    revealProgress: { value: 0, min: 0, max: 1 },
  });
  const xShift = positionX;

  return (
    <mesh
      position={[xShift ?? 0, 0, 0]}
      rotation-z={rotationZ ?? 0}
      ref={meshRef}
      scale={8}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <imageRevealMaterial attach="material" ref={materialRef} />
    </mesh>
  );
};

export default RevealImage;
