"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Footer from "./components/Footer";
import Herov2 from "./components/Herov2";
import Services from "./components/Services";
import UnderHero from "./components/UnderHero";

export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });
  return (
    <ReactLenis root>
      <main className="relative">
        <Herov2 />
        <UnderHero scrollYProgress={scrollYProgress} />
        <Services />
        <div className="fixed showReel overflow-hidden aspect-video h-[50px] -z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          <Image
            fill
            className="object-cover"
            src={"/projects/lofothuset.png"}
            alt={""}
          />
        </div>
        <div className="h-[100vh] bg-transparent"></div>
        {/* <About /> */}

        <Footer />
      </main>
    </ReactLenis>
  );
}
