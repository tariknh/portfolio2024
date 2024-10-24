import { useRef } from "react";

import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import gsap from "gsap"; // <-- import GSAP
import { Button } from "./button";

gsap.registerPlugin(useGSAP);

import { ReactNode } from "react";

export default function HoverButton({ children }: { children: ReactNode }) {
  const button: any = useRef(null);
  const wrapRef = useRef<HTMLButtonElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const durationSetting = 0.4;
  const easeSetting = "power2.out";

  const getPercentTop = (el: HTMLButtonElement, e: MouseEvent) => {
    const elTop = el.getBoundingClientRect().top;
    const mouseTop = e.clientY - elTop;
    return (mouseTop / el.offsetHeight) * 100;
  };

  const getPercentLeft = (el: HTMLButtonElement, e: MouseEvent) => {
    const elLeft = el.getBoundingClientRect().left;
    const mouseLeft = e.clientX - elLeft;
    return (mouseLeft / el.offsetWidth) * 100;
  };

  useGSAP((context, contextSafe: any) => {
    const wrapElement = wrapRef.current;
    const clipElement = clipRef.current;
    if (!wrapElement || !clipElement) return () => {};

    const handleMouseEnter = (e: MouseEvent) => {
      const percentTop = getPercentTop(wrapElement, e);
      const percentLeft = getPercentLeft(wrapElement, e);

      gsap.set(clipElement, { display: "flex" });
      gsap.fromTo(
        clipElement,
        { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
        {
          clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
          duration: durationSetting,
          ease: easeSetting,
        }
      );
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const percentTop = getPercentTop(wrapElement, e);
      const percentLeft = getPercentLeft(wrapElement, e);

      gsap.to(clipElement, {
        clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
        overwrite: true,
        duration: durationSetting,
        ease: easeSetting,
      });
    };

    wrapElement.addEventListener("mouseenter", handleMouseEnter);
    wrapElement.addEventListener("mouseleave", handleMouseLeave);

    // 👍 we remove the event listener in the cleanup function below.
    return () => {
      // <-- cleanup
      wrapElement.removeEventListener("mouseenter", handleMouseEnter);
      wrapElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, {}); // <-- scope for selector text (optional)

  return (
    <Button
      data-btn="wrap"
      className="w-40 no-underline hover:no-underline border-white bg-blend-difference"
      size={"short"}
      variant={"outline"}
      ref={wrapRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        data-btn="clip"
        ref={clipRef}
        aria-hidden="true"
        className="text-background flex items-center justify-center text-sm"
        style={{
          display: "none",
          position: "absolute",
          textAlign: "center",
          inset: 0,
          color: "black",
          backgroundColor: "white", // Set the circle color (e.g., semi-transparent blue)
          //borderRadius: "50%", // Make it a circle
          pointerEvents: "none", // Ensures the circle doesn't interfere with mouse events
        }}
      >
        {/* Content inside the clip */}
        <span className="text-background!important">{children}</span>
      </div>
      {/* Wrap button content */}
      {children}
    </Button>
  );
}
