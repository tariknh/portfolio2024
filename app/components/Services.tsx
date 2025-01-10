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
import useDeviceDetection from "../hooks/useDevice";

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
      <div
        ref={container}
        className="text-background flex-col text-5xl md:text-7xl lg:text-9xl  p-12 bg-primary splitSection"
      >
        <div className=" overflow-hidden bg-primary ">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView="onscreen"
            className=" whati"
          >
            WHAT I
          </motion.h2>
        </div>
        <div className=" overflow-hidden bg-primary  ">
          <motion.h2 initial={{ y: -80 }} className=" dobest">
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
  const device = useDeviceDetection();
  console.log(device, "device");

  useGSAP(() => {
    tl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 0.3,
          start: "top top",
          markers: false,
        },
        delay: 0,
      })

      .to(
        ".splitSection",
        {
          backgroundColor: "transparent",
        },
        "0" // Start at the same time
      )
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
      )
      .to(
        ".bottomFull",
        {
          autoAlpha: 0,
        },
        ">" // Start at the same time
      )
      .to(
        ".showReel",
        {
          height: device == "Mobile Device" ? "200px" : "500px",
        },
        ">" // Start at the same time
      );

    gsap.to(".showReel", {
      duration: 1,
      // top: "40%",
      ease: "power2.out",
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
      scrollTrigger: {
        trigger: container.current,
        start: "200vh", // Trigger 200vh past the last animation
        scrub: true,
      },
    });
  }, {});

  return (
    <section
      ref={container}
      className=" w-full h-screen mt-40 grid grid-cols-2 grid-rows-2"
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
