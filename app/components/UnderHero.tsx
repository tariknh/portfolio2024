import Hoverbutton from "@/components/ui/Hoverbutton";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const Project = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row md:justify-between w-full h-full gap-5 text-white">
      <div className="max-w-lg md:max-w-none flex flex-col justify-center">
        <h2 className="text-xl md:text-6xl font-bold">Lofothuset</h2>
        <h2 className="text-xs font-thin text-end">
          Branding, Marketing, Design
        </h2>
        {/* <Button className="w-40" size={"short"} variant={"outline"}>
          View case
        </Button> */}
        <Hoverbutton />
      </div>
      <div className="h-full min-h-72 rounded-lg overflow-hidden relative w-full">
        <Image
          className="aspect-video h-full"
          src="/projects/lofothuset.png"
          alt="lofothuset"
          fill
        />
      </div>
    </div>
  );
};

const UnderHero = ({ scrollYProgress }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div className=" bg-primary grid-cols-1 grid grid-rows-6">
      <motion.span
        animate={{
          y: isInView ? "0%" : "50%",
          opacity: isInView ? 1 : 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        ref={ref}
        className="justify-self-center row-start-2 text-7xl md:text-8xl lg:text-9xl text-center w-full text-white font-bold"
      >
        RECENT <span className="font-outline-2 text-primary">WORK</span>
      </motion.span>
      <div className="sm:row-start-4 row-span-2 px-5 sm:px-40">
        <Project />
      </div>
    </div>
  );
};

export default UnderHero;
