"use client";

import { motion, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Gradient } from "./Gradient.js";

const Hero = ({ scrollYProgress }: any) => {
  useEffect(() => {
    // Create your instance
    const gradient = new Gradient();

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient("#gradient-canvas");
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className="h-screen sticky -z-10 top-0 place-content-center items-center content-center w-full flex"
    >
      <div className="place-self-center flex flex-col gap-2 text-center text-8xl font-extrabold self-center w-full">
        <h2 className="md:text-4xl text-lg font-inter text-white font-outline-2">
          CREATIVE DEVELOPER
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl">TARIK SØRENSEN</h1>
      </div>
      <canvas id="gradient-canvas" data-transition-in />
    </motion.div>
  );
};

export default Hero;
