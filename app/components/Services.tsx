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

import Image from "next/image";
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
        className="text-background flex-col text-5xl md:text-7xl lg:text-9xl font-editorial bg-primary splitSection"
      >
        <div className=" overflow-hidden bg-primary h-fit p-1  ">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView="onscreen"
            className=" whati "
          >
            WHAT I
          </motion.h2>
        </div>
        <div className=" overflow-hidden bg-primary p-1  ">
          <motion.h2 initial={{ y: -200 }} className=" dobest">
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
      // .to(
      //   ".bottomFull",
      //   {
      //     autoAlpha: 0,
      //   },
      //   ">" // Start at the same time
      // )
      .to(
        ".showReel",
        {
          height: device == "Mobile Device" ? "200px" : "500px",
        },
        ">" // Start at the same time
      )
      .to(
        ".bottomFull",
        {
          autoAlpha: 0,
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
      <div className="flex p-6 bg-background rounded-3xl justify-center text-primary text-center topLeft flex-col gap-2 relative">
        <span className="absolute font-sans top-7 left-7 text-2xl">(01)</span>
        <div className="group text-3xl flex flex-col items-center gap-2 md:text-5xl sm:flex-row md:justify-center cursor-default">
          Web{" "}
          <div className="group-hover:h-20 transition-all rounded-3xl overflow-hidden duration-300 ease-out relative h-0 aspect-video">
            <Image
              fill
              className="object-cover"
              src={"/projects/lofothuset.png"}
              alt={""}
            />
          </div>
          <br className="sm:hidden" /> Design
        </div>
      </div>
      <div className="flex p-6 bg-background rounded-3xl justify-center text-primary relative text-center topRight flex-col gap-2">
        <span className="absolute font-sans top-7 left-7 text-2xl">(02)</span>
        <div className="group text-3xl flex flex-col items-center gap-2 md:text-5xl md:justify-center cursor-default">
          Brand{" "}
          <div className="group-hover:h-20 transition-all rounded-3xl overflow-hidden duration-300 ease-out relative h-0 aspect-video">
            <Image
              fill
              className="object-cover"
              src={"/projects/lofothuset.png"}
              alt={""}
            />
          </div>
          <br className="sm:hidden" /> Identity
        </div>
      </div>
      <div className="flex col-span-2 p-6 bg-background rounded-3xl justify-center text-primary text-center topLeft flex-col gap-2">
        <span className="absolute font-sans top-7 left-7 text-2xl">(03)</span>
        <div className="group text-3xl flex flex-col items-center gap-2 md:text-5xl sm:flex-row md:justify-center cursor-default">
          Web{" "}
          <div className="group-hover:h-20 transition-all rounded-3xl overflow-hidden duration-300 ease-out relative h-0 aspect-video">
            <Image
              fill
              className="object-cover"
              src={"/projects/lofothuset.png"}
              alt={""}
            />
          </div>
          <br className="sm:hidden" /> Development
        </div>
      </div>
      {/* <div className="col-span-2 p-6 bg-background text-primary justify-center rounded-3xl bottomFull  flex flex-col gap-2 text-center">
        <h2 className="text-3xl">Web Development</h2>
      </div> */}
    </section>
  );
};

export default Services;
