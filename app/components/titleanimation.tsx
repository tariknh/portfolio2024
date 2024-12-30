import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import SplitText from "split-type";

const Fx2TitleAnimation = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (titleRef.current) {
        // Split the text into individual characters
        const split = new SplitText(titleRef.current, { types: "chars" });
        const chars = split.chars;

        // GSAP animation for the characters
        gsap.fromTo(
          chars,
          {
            "will-change": "opacity, transform",
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: "50% 0%",
          },
          {
            duration: 1,
            ease: "back.inOut(2)",
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: 0.03,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "center bottom+=50%",
              end: "bottom top+=40%",
              scrub: false,
            },
          }
        );

        // Cleanup SplitText when the component unmounts
        return () => {
          split.revert();
        };
      }
    },
    { scope: titleRef }
  );

  return (
    <h1
      ref={titleRef}
      className="fx2-title text-center max-w-2xl text-white text-5xl place-self-center"
    >
      My design approach elevates user experience and engagement
    </h1>
  );
};

export default Fx2TitleAnimation;
