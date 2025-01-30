"use client";
import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { extend, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import * as THREE from "three";
import { ShaderMaterial, Vector2 } from "three";
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
    uMouse: new Vector2(),
    uPrevMouse: new Vector2(),
    uAspect: 0,
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
      uMouse: Vector2;
      uPrevMouse: Vector2;
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
    ShaderMaterial & {
      uTexture: THREE.Texture;
      uTime: any;
      uProgress: any;
      uMouse: any;
      uPrevMouse: any;
      uAspect: any;
    }
  >(null);

  const previousMouse = useRef(new Vector2());

  // LOADING TEXTURE & HANDLING ASPECT RATIO
  const texture = useTexture(imageTexture, (loadedTexture) => {
    if (materialRef.current) {
      materialRef.current.uTexture = loadedTexture;
    }
  });
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.6);

  const canvasWidth = window?.innerWidth;
  const canvasHeight = window?.innerHeight;

  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      // materialRef.current.uProgress = revealProgress;
      materialRef.current.uProgress = 0.6;
      materialRef.current.uAspect = scale;

      const currentMouse = new Vector2(
        (pointer.x + 1) / 2, // Normalize to [0, 1]
        (pointer.y + 1) / 2
      );

      materialRef.current.uMouse.set(currentMouse.x, currentMouse.y);
      materialRef.current.uPrevMouse.set(
        previousMouse.current.x,
        previousMouse.current.y
      );

      previousMouse.current.copy(currentMouse);
    }
  });

  // const { revealProgress } = useControls({
  //   revealProgress: { value: 0.6, min: 0, max: 1 },
  // });
  const xShift = positionX;

  return (
    <mesh
      position={[xShift ?? 0, 0, 0]}
      rotation-z={rotationZ ?? 0}
      ref={meshRef}
      scale={6}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <imageRevealMaterial attach="material" ref={materialRef} />
    </mesh>
  );
};

export default RevealImage;
