"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

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
      tl.current = gsap.timeline({ paused: false }).to(".square", {
        backgroundColor: isToggled ? "red" : "purple",
        duration: 1,
        x: "50%",
      });
      isToggled ? tl.current.resume() : tl.current.paused(true);

      //tl.current.reversed(!tl.current.reversed());
    },
    {
      scope: container,

      revertOnUpdate: false,
    }
  ); // we can pass in a config object as the 1st parameter to make scoping simple
  const toggleTimeline = contextSafe(() => {
    console.log("toggling");

    tl.current.resume();
    isToggled && tl.current.reversed(!tl.current.reversed());
  });
  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.

  return (
    <nav
      ref={container}
      className="h-24 flex justify-between fixed w-full text-white items-center p-4"
    >
      <span>tarik sørensen</span>
      <div className="flex gap-1">
        <Button
          className={`z-20 ${
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
      <div className="absolute square  w-2/4 z-40 bg-purple-400 h-screen"></div>
    </nav>
  );
};

export default Newnav;
