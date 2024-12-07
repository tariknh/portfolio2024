"use client";
import { Canvas } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Footer from "./components/Footer";
import Herov2 from "./components/Herov2";
import Services from "./components/Services";
import UnderHero from "./components/UnderHero";
import RevealImage from "./hooks/RevealImage";

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });
  return (
    <main className="relative">
      <Canvas
        className="z-10"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <RevealImage imageTexture={"/projects/lofothuset.png"} />
      </Canvas>
      <Herov2 />
      <UnderHero scrollYProgress={scrollYProgress} />
      <Services />
      <Footer />
    </main>
  );
}
