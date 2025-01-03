import {
  animate,
  AnimationSequence,
  cubicBezier,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";
import Card from "./Card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


const Services = () => {
  const container = useRef(null);
  const isInView = useInView(container);

  useEffect(() => {
    const sequence: AnimationSequence = [
      [
        ".whati",
        { opacity: 1, x: 0 },
        { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
      ],
      [
        ".dobest",
        { y: 0 },
        { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
      ],
      [
        ".dobest",
        { x: "20%" },
        { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
      ],
    ];
    if (isInView) {
      animate(sequence);
    }
  }, [isInView]);

  return (
    <div className="min-h-screen bg-primary">
      <div ref={container} className="text-background   flex-col px-5 md:px-20">
        <div className=" overflow-hidden p-2 ">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView="onscreen"
            className="text-5xl whati"
          >
            WHAT I
          </motion.h2>
        </div>
        <div className=" overflow-hidden  ">
          <motion.h2 initial={{ y: -80 }} className="text-5xl dobest">
            DO BEST
          </motion.h2>
        </div>

        {/* {[
          ...Array(4).map((_, index) => (
            <Card
              key={index}
              id={`card-${index}`}
              frontSrc="/card-front.png"
              frontAlt="Card Image"
              backText="Your card details will appear here"
            />
          )),
        ]} */}
       

        <UnvealSection/>
      
      </div>
    </div>
  );
};

const UnvealSection = () => {

  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    
    tl.current = gsap
      .timeline(
        {
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 1,
            start: "top top"
          }
        }
      )
      .to(".topLeft", {
        xPercent: -120,
        
      },">")
      .to(".topRight", {
        xPercent: 120
      },">")
      .to(".bottomFull", {
        yPercent: 120,
        autoAlpha: 0
      },">");
  }, { scope: container });

  return (
    <section ref={container} className="bg-secondary h-screen mt-40 grid grid-cols-2 grid-rows-2">
      <div className="flex p-12 bg-primary topLeft flex-col gap-2">
        <h2 className="text-4xl">Web Design</h2>
        <p className="text-zinc-400 font-thin text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo numquam accusantium natus at tempore quibusdam accusamus culpa ratione iure quasi?</p>
      </div>
      <div className="flex p-12 bg-primary topRight flex-col gap-2">
        <h2 className="text-4xl">Brand Identity</h2>
        <p className="text-zinc-400 font-thin text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo numquam accusantium natus at tempore quibusdam accusamus culpa ratione iure quasi?</p>
      </div>
      <div className="col-span-2 p-12 bg-primary bottomFull -z-20 flex flex-col gap-2">
        <h2 className="text-4xl">Web Development</h2>
        <p className="text-zinc-400 font-thin text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo numquam accusantium natus at tempore quibusdam accusamus culpa ratione iure quasi?</p>
      </div>
    </section>
  )
}
 
export default Services;
