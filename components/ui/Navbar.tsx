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

const Navbar = () => {
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
        .to(".pathContainer", {
          display: "block",
        })
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
            yPercent: 80,
            display: "none",
          },
          {
            display: "block",
            yPercent: 0,
            stagger: 0.1,
            ease: "Power2.easeOut",
          }
        )

        .fromTo(
          ".contactMe",
          {
            y: 100,
          },
          {
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
      className="h-24 flex z-50 justify-between fixed w-full text-white items-center p-4"
    >
      <span className="z-50 md:text-2xl">tarik sørensen</span>
      <div className="flex gap-1">
        <Button
          className={`z-50 ${
            isToggled ? "text-black border-black" : "text-white border-white"
          } `}
          size={"long"}
          variant={"outline"}
        >
          Get in touch
        </Button>
        <Button
          ref={goodRef}
          className={`z-50 ${
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
      <div className="h-screen text-primary pathContainer hidden fixed left-0 w-full top-0 ">
        <div className="navInner p-12 fixed  z-[90] hidden h-full md:text-6xl grid-cols-3 w-full justify-center items-center">
          <div className="h-full col-start-2 col-span-2 flex overflow-hidden place-content-end flex-col text-primary self-end md:text-6xl font-bold">
            <div className="h-[2rem] flex overflow-hidden">
              <span className="text-sm h-fit contactMe overflow-hidden text-accent uppercase tracking-widest">
                Contact me!
              </span>
            </div>
            <div className="h-[2rem] flex overflow-hidden">
              <span className="contactMe h-fit overflow-hidden">
                tarik@tarik.no
              </span>
            </div>
            <div className="h-[2rem] flex overflow-hidden">
              <span className="contactMe h-fit overflow-hidden">
                +47 951 89 711
              </span>
            </div>
          </div>
          <div className="flex row-start-1 col-start-1 col-span-3 overflow-hidden justify-center flex-col min-h-full gap-1 text-5xl md:text-8xl font-bold">
            {navItems.map((item, i) => {
              return (
                <div className="md:h-[6.5rem] h-[3rem] overflow-hidden" key={i}>
                  <Link className="navLinks" href={item.href}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <svg
          className="transition pathContainer hidden absolute top-0 h-screen w-full left-0 z-10 "
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="path"
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

export default Navbar;
