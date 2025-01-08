import MagneticButton from "@/components/ui/magnetic-button";

import { motion, useScroll } from "motion/react";
import Link from "next/link";

import SplitType from "split-type";

import { useRef } from "react";

import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import gsap from "gsap"; // <-- import GSAP
import { useMounted } from "../hooks/useMounted";
gsap.registerPlugin(useGSAP);

const Footer = () => {
  const mounted = useMounted();

  const { scrollYProgress } = useScroll();

  const container = useRef(null);

  useGSAP(
    () => {
      const footerTitle = new SplitType("#footerTitle", {
        types: "chars",
        charClass: "footerChar",
      });
      // gsap code here...
      gsap.from(".footerChar", {
        yPercent: 200,
        stagger: 0.05,
        delay: 0.4,
        duration: 3,
        ease: "back.inOut(2)",
        scrollTrigger: {
          trigger: container.current,
        },
      });
    },
    { scope: container }
  ); // <-- scope for selector text (optional)

  return (
    <footer
      ref={container}
      className="h-screen grid-rows-12 gap-2 bg-primary grid p-6 py-16"
    >
      <motion.div className="h-full relative row-span-12 content-center gap-2 items-center grid grid-rows-3 place-content-center bg-background rounded-2xl">
        <h1
          id="footerTitle"
          className="text-center relative overflow-hidden h-fit text-7xl col-start-1 row-start-2 md:text-9xl"
        >
          Let’s talk!
        </h1>
        <MagneticButton className="border-2 row-start-2 row-span-2 col-start-1 self-center justify-self-center text-center grid items-center border-primary p-2 h-36 w-36 text-sm rounded-full">
          <div className="">GET IN TOUCH</div>
        </MagneticButton>
      </motion.div>
      <div className="flex justify-between text-xs text-background row-span-1">
        <Link href={""}>TWITTER / X</Link>
        <Link href={""}>LINKEDIN</Link>
        <Link href={""}>TARIK@TARIK.NO</Link>
      </div>
    </footer>
  );
};

export default Footer;
