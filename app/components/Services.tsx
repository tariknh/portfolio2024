import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  animate,
  AnimationSequence,
  cubicBezier,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";

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
    <div className="min-h-screen bg-transparent">
      <div ref={container} className="text-background flex-col">
        <div className=" overflow-hidden p-2 bg-primary ">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView="onscreen"
            className="text-5xl whati"
          >
            WHAT I
          </motion.h2>
        </div>
        <div className=" overflow-hidden bg-primary  ">
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

        <UnvealSection />
      </div>
    </div>
  );
};

const UnvealSection = () => {
  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 1,
            start: "top top",
            markers: true,
          },
        })
        .to(container.current, {
          backgroundColor: "transparent",
        })
        .to(
          ".topLeft",
          {
            xPercent: -120,
          },
          "0" // Start at the same time
        )
        .to(
          ".topRight",
          {
            xPercent: 120,
          },
          "0" // Start at the same time
        )
        .to(
          ".bottomFull",
          {
            yPercent: 120,
          },
          "0" // Start at the same time
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-primary w-full h-screen mt-40 grid grid-cols-2 grid-rows-2"
    >
      <div className="flex p-12 bg-primary topLeft flex-col gap-2">
        <h2 className="text-3xl">Web Design</h2>
        <p className="text-zinc-400 font-thin text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex p-12 bg-primary topRight flex-col gap-2">
        <h2 className="text-3xl">Brand Identity</h2>
        <p className="text-zinc-400 font-thin text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="col-span-2 p-12 bg-primary bottomFull -z-20 flex flex-col gap-2">
        <h2 className="text-3xl">Web Development</h2>
        <p className="text-zinc-400 font-thin text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </section>
  );
};

export default Services;
