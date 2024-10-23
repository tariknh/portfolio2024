import Hoverbutton from "@/components/ui/Hoverbutton";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import gsap from "gsap"; // <-- import GSAP
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 

const Project = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const goodRef = useRef<HTMLButtonElement | null>(null);
 

  useGSAP(() => {
    let tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container",
          markers: true,
          scrub: true,
          start: "top top",
        },
      })
      .fromTo(".left", {
        
        translateX: "-200%",
        rotate: ("-50deg")
      },
      {
        translateX: "0%",
        rotate: ("0deg")
      },
     
    ).fromTo(".right", {
      translateX: "200%",
      rotate: ("50deg")
    },
    {
      translateX: "0%",
      rotate: ("0deg")
    },
   "<"
  )
  }, { scope: container },);

 

  return (
    <div ref={container} className="container flex flex-col-reverse sm:flex-row md:justify-between w-full h-full gap-5 lg:gap-12 text-white">
      <div className="left max-w-lg md:max-w-none gap-2 flex flex-col justify-center">
        <h2 className="text-xl md:text-6xl font-bold">Lofothuset</h2>
        <h2 className="text-xs text-pretty font-thin mb-6 text-zinc-400 text-end">
          Branding, Marketing, Design
        </h2>
        {/* <Button className="w-40" size={"short"} variant={"outline"}>
          View case
        </Button> */}
        <Hoverbutton />
      </div>
      <div className="right h-full min-h-72 lg:min-h-[40rem] md:min-w-[16rem] rounded-lg overflow-hidden relative w-full">
        <Image
          className="aspect-video object-cover fit h-full"
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
        RECENT <span className="font-outline-2-white text-primary">WORK</span>
      </motion.span>
      <div className="sm:row-start-4 row-span-2 px-5 md:px-20">
        <Project />
      </div>
    </div>
  );
};

export default UnderHero;
