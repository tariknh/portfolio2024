"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Herov2 from "./components/Herov2";
import UnderHero from "./components/UnderHero";

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });
  return (
    <main className="relative">
      <Herov2 />
      <UnderHero scrollYProgress={scrollYProgress} />
    </main>
  );
}
