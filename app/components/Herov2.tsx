import gsap from "gsap";
import SplitType from "split-type";
import { useMounted } from "../hooks/useMounted";
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
        stagger: 0.1,
        delay: 0.1,
        duration: 0.03,
        ease: "power4.in",
      });
  }

  return (
    <div className="flex flex-col">
      <div className="h-screen p-8 overflow-hidden flex items-end justify-between">
        <h1
          id="heroTitle"
          className="md:leading-[12rem] align-top font-bold text-7xl md:text-[15rem]"
        >
          tarik
        </h1>
        <h2
          id="heroSubTitle"
          className="overflow-hidden h-fit align-top relative md:text-3xl text-sm text-right text-balance max-w-xl"
        >
          is a creative web developer based in Norway
        </h2>
      </div>
    </div>
  );
};

export default Herov2;
