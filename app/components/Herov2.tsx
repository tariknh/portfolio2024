import gsap from "gsap";
import SplitType from "split-type";
import { useMounted } from "../hooks/useMounted";
import BackgroundCanvas from "./threejs/BackgroundCanvas";
const Herov2 = () => {
  const mounted = useMounted();
  if (mounted) {
    const heroTitle = new SplitType("#heroTitle");
    const heroSubTitle = new SplitType("#heroSubTitle", {
      types: "words,lines",
      wordClass: "heroSubWord",
      lineClass: "heroSubLine",
    });
    const tl = gsap
      .timeline()
      .to(".char", {
        y: 0,
        stagger: 0.05,
        delay: 0.4,
        duration: 0.1,
        ease: "power4.in",
      })
      .to(".heroSubWord", {
        y: 0,
        stagger: 0.08,
        delay: 0.01,
        duration: 0.02,
        ease: "expo.in",
      });
  }

  return (
    <div className="flex flex-col">
      <div className="absolute w-screen h-screen z-5">
        <BackgroundCanvas />
      </div>
      <div className=" h-screen pointer-events-none p-8 relative overflow-hidden flex items-end justify-between">
        {/* <h1
          id="heroTitle"
          className="text-background md:leading-[12rem] align-top font-bold text-7xl md:text-[14rem]"
        >
          tarik
        </h1> */}
        <h2
          id="heroSubTitle"
          className="text-background overflow-hidden h-fit align-top relative md:text-3xl text-sm text-left text-balance max-w-xl"
        >
          is a creative web developer based in Norway
        </h2>
      </div>
    </div>
  );
};

export default Herov2;
