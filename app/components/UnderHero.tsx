import Hoverbutton from "@/components/ui/Hoverbutton";
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { Canvas } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import gsap from "gsap"; // <-- import GSAP
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Mesh } from "three";
import RevealImage from "../hooks/RevealImage";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const goodRef = useRef<HTMLButtonElement | null>(null);
  const left = useRef<HTMLDivElement | null>(null);
  const right = useRef<Mesh | null>(null);

  useGSAP(
    () => {
      let tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: left.current,
            markers: false,
            scrub: 0.5,
            start: "top bottom",
            end: "+=600",
          },
        })
        .fromTo(
          left.current,
          {
            xPercent: "-200",
            rotate: "-50",
          },
          {
            xPercent: "0",
            rotate: "0",
            ease: "power2.out",
          }
        )
        .fromTo(
          right.current,
          {
            translateX: "200%",
            rotate: "50deg",
          },
          {
            translateX: "0%",
            rotate: "0deg",
          },
          "<"
        );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="container flex flex-col-reverse sm:flex-row md:justify-evenly w-full h-full gap-5 lg:gap-12 text-white"
    >
      <div
        ref={left}
        className="left will-change-transform max-w-lg md:max-w-none gap-2 flex flex-col justify-center"
      >
        <h2 className="text-xl md:text-6xl lg:text-7xl font-bold">
          Lofothuset
        </h2>
        <h2 className="text-xs md:text-sm lg:text-xl text-pretty font-sans font-thin mb-6 text-zinc-400 sm:text-end">
          Branding, Marketing, Design
        </h2>
        {/* <Button className="w-40" size={"short"} variant={"outline"}>
          View case
        </Button> */}
        <Hoverbutton>View case</Hoverbutton>
      </div>
      <div className="right md:min-h-72 w-[25rem] md:w-[45rem] lg:min-h-[40rem] rounded-lg  relative">
        <Canvas className="overflow-visible">
          <RevealImage
            meshRef={right}
            positionX={0}
            imageTexture="/projects/lofothuset.png"
          />
        </Canvas>
        {/* <Image
          className="aspect-video object-cover fit h-full"
          src={lofothuset}
          alt="lofothuset"
          fill
        /> */}
      </div>
    </div>
  );
};

const UnderHero = ({ scrollYProgress }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="font-editorial bg-primary w-full grid pt-20 gap-20">
      <motion.span
        animate={{
          y: isInView ? "0%" : "50%",
          opacity: isInView ? 1 : 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        ref={ref}
        className="justify-self-center my-80 text-6xl md:text-8xl lg:text-9xl text-center w-full text-wrap text-white font-medium"
      >
        RECENT WORK
      </motion.span>

      <div className="flex gap-40 my-20 items-center flex-col px-5 md:px-20">
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  );
};

export default UnderHero;
