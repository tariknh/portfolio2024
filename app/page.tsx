"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/Hero";
import UnderHero from "./components/UnderHero";

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });
  return (
    <main className="h-[200vh] relative">
      <Hero scrollYProgress={scrollYProgress} />
      <UnderHero scrollYProgress={scrollYProgress} />
    </main>
  );
}
