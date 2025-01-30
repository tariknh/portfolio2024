import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const CardAnimation = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card") as HTMLElement[];
      const rotations = [-12, 10, -5, 5, -5, -2];

      cards.forEach((card, index) => {
        gsap.set(card, {
          rotate: rotations[index],
          y: window.innerHeight,
        });
      });

      ScrollTrigger.create({
        trigger: ".stickyContainer",
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;
          const progressPerCard = 1 / totalCards;

          cards.forEach((card, index) => {
            const cardStart = index * progressPerCard;
            let cardProgress = (progress - cardStart) / progressPerCard;
            cardProgress = Math.min(Math.max(cardProgress, 0), 1);

            let yPos = window.innerHeight * (1 - cardProgress);
            let xPos = 0;

            if (cardProgress == 1 && index < totalCards - 1) {
              const remainingProgress =
                (progress - (cardStart + progressPerCard)) /
                (1 - (cardStart + progressPerCard));
              if (remainingProgress > 0) {
                const distanceMultiplier = 1 - index * 0.15;
                xPos =
                  -window.innerWidth *
                  0.3 *
                  distanceMultiplier *
                  remainingProgress;
                yPos = -window.innerHeight * 0.3 * remainingProgress;
              }
            }
            gsap.to(card, {
              y: yPos,
              x: xPos,
              duration: 0,
              ease: "none",
            });
          });
        },
      });
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="stickyContainer w-screen h-screen overflow-hidden relative bg-slate-200"
    >
      <Card src="/Images/1.jpg" text={"X01-842"} />
      <Card src="/Images/2.jpg" text={"X01-842"} />
      <Card src="/Images/3.jpg" text={"X01-842"} />
      <Card src="/Images/4.jpg" text={"X01-842"} />
    </div>
  );
};

const Card = ({ src, text }: { src: string; text: string }) => {
  return (
    <div className="card absolute top-1/2 left-1/2 gap-2 bg-slate-600 flex-col -translate-y-1/2 -translate-x-1/2  h-1/2 w-1/4  p-2 flex will-change-transform">
      <div className="card-img flex-1 w-full min-h-0">
        <Image
          width={5000}
          height={5000}
          className="object-cover h-full w-full"
          alt=""
          src={src}
        />
      </div>
      <div className="card-content flex-none basis-[12px] items-center">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default CardAnimation;
