"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import gsap from "gsap"; // <-- import GSAP
gsap.registerPlugin(useGSAP);

const Newnav = () => {
  const [isToggled, setToggle] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const goodRef = useRef<HTMLButtonElement | null>(null);
  const tl = useRef<any>();

  const { contextSafe } = useGSAP(
    () => {
      console.log("creating timeline");
      gsap.set(".square", {
        clipPath: "ellipse(56% 0% at 50% 100%)",
      });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".square", {
          display: "block",
        })
        .to(
          ".square",
          {
            backgroundColor: isToggled ? "red" : "purple",
            duration: 1,
            display: "block",
          },
          0.1
        )
        .to(".square", {
          clipPath: "ellipse(56% 50% at 50% 100%)",

          duration: 0.3,
        })
        // .to(
        //   ".square",
        //   {
        //     clipPath: "ellipse(100% 100% at 50% 100%)",
        //     //ease: "power3.out",
        //     duration: 0.3,
        //   },
        //   ">"
        // )
        .to(
          ".square",
          {
            clipPath: "ellipse(100% 100% at 50% 50%)",
            ease: "power3.inOut",
            duration: 0.5,
          },
          ">"
        );

      //tl.current.reversed(!tl.current.reversed());
    },
    {
      scope: container,
      revertOnUpdate: false,
    }
  ); // we can pass in a config object as the 1st parameter to make scoping simple
  const toggleTimeline = contextSafe(() => {});
  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.

  useEffect(() => {
    isToggled ? tl.current.play() : tl.current.reverse();
  }, [isToggled]);

  return (
    <nav
      ref={container}
      className="h-24 flex justify-between fixed w-full text-white items-center p-4"
    >
      <span>tarik sørensen</span>
      <div className="flex gap-1">
        <Button
          className={`z-70 ${
            isToggled ? "text-black border-black" : "text-white border-white"
          } `}
          size={"long"}
          variant={"outline"}
        >
          Get in touch
        </Button>
        <Button
          ref={goodRef}
          className={`z-20 ${
            isToggled ? "text-black border-black" : "text-white border-white"
          } `}
          onClick={() => {
            toggleTimeline();
            setToggle(!isToggled);
          }}
          size={"short"}
          variant={"outline"}
        >
          =
        </Button>
      </div>
      <div className="absolute square hidden  w-full top-0 left-0 bg-purple-400 h-screen"></div>
    </nav>
  );
};

export default Newnav;
