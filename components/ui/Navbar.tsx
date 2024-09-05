"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import gsap from "gsap"; // <-- import GSAP
import Link from "next/link";
gsap.registerPlugin(useGSAP);

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const Newnav = () => {
  const [isToggled, setToggle] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const goodRef = useRef<HTMLButtonElement | null>(null);
  const tl = useRef<any>();

  const { contextSafe } = useGSAP(
    () => {
      const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

      tl.current = gsap
        .timeline({ paused: false })
        .to(".path", {
          attr: { d: start },
          ease: "Power2.easeIn",
          duration: 0.8,
        })
        .to(".path", {
          attr: { d: end },
          ease: "Power2.easeOut",
          duration: 0.4,
        })
        .to(".navInner", {
          display: "grid",
        })
        .fromTo(
          ".navLinks",
          {
            y: 80,
            display: "none",
          },
          {
            display: "block",
            y: 0,
            stagger: 0.1,
            ease: "Power2.easeOut",
          }
        )
        .fromTo(
          ".contactMe",
          {
            y: 80,
            display: "none",
          },
          {
            display: "flex",
            y: 0,
            stagger: 0.1,
            ease: "Power2.easeOut",
          }
        );
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
      {/* {<div className="absolute square hidden  w-full top-0 left-0 bg-purple-400 h-screen"></div>} */}
      <div className="h-screen fixed left-0 w-full top-0 text-white ">
        <div className="navInner p-12 fixed text-black z-[90] hidden h-full text-6xl grid-cols-2 w-full justify-center items-center">
          <div className="h-full flex flex-col self-end gap-4 text-6xl font-bold">
            <span className="text-sm contactMe text-blue-700 uppercase tracking-widest">
              Contact me!
            </span>
            <span className="contactMe">tarik@tarik.no</span>
            <span className="contactMe">+47 951 89 711</span>
          </div>
          <div className="flex col-start-2 justify-center flex-col h-full gap-4 text-8xl font-bold">
            {navItems.map((item, i) => {
              return (
                <div className="h-[6.5rem] overflow-hidden" key={i}>
                  <Link className="navLinks" href={item.href}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <svg
          className="transition absolute top-0 left-0 z-10 "
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="path"
            stroke="#000"
            stroke-width="2px"
            dur="10s"
            fill="white"
            vector-effect="non-scaling-stroke"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Newnav;
