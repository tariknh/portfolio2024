import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BackdropPlane from "./backdropPlane/backdropPlane";

type Props = {};

const BackgroundCanvas = (props: Props) => {
  return (
    <Canvas
      gl={{ alpha: false, antialias: false }}
      className="absolute inset-0"
    >
      <OrthographicCamera />
      <BackdropPlane />
    </Canvas>
  );
};

export default BackgroundCanvas;
