import MagneticButton from "@/components/ui/magnetic-button";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <footer className="h-screen grid-rows-12 gap-2 bg-primary grid p-6 py-16">
      <motion.div className="h-full row-span-12 content-center gap-2 items-center grid grid-rows-3 place-content-center bg-background rounded-2xl">
        <h1 className="text-center text-7xl col-start-1 row-start-2 md:text-9xl">
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
