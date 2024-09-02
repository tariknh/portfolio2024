"use client";
import { Scroll, ScrollControls, Text } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

const words = ["Hello", "World", "React", "Three"];

const Items = ({ w = 0.7, gap = 0.15 }) => {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls distance={0.7} pages={2} damping={0.1}>
      <Scroll>
        {
          words.map((word, index) => <Item key={index} word={word} index={index}  />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
};

const Item = ({ index, word, ...props }: any) => {
  return (
    <Text
      position={[0, -15 * index, 0]}
      key={index}
      fontSize={15}
      color={"black"}
    >
      {word}
    </Text>
  );
};

const Hero = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Items />
      {/* <TrackballControls /> */}
    </Canvas>
  );
};

export default Hero;
