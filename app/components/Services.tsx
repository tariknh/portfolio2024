import {
  animate,
  AnimationSequence,
  cubicBezier,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";
import Card from "./Card";

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
    <div className="min-h-screen bg-primary">
      <div ref={container} className="text-background   flex-col px-5 md:px-20">
        <div className=" overflow-hidden p-2 ">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView="onscreen"
            className="text-5xl whati"
          >
            WHAT I
          </motion.h2>
        </div>
        <div className=" overflow-hidden  ">
          <motion.h2 initial={{ y: -80 }} className="text-5xl dobest">
            DO BEST
          </motion.h2>
        </div>
        {[
          ...Array(4).map((_, index) => (
            <Card
              key={index}
              id={`card-${index}`}
              frontSrc="/card-front.png"
              frontAlt="Card Image"
              backText="Your card details will appear here"
            />
          )),
        ]}
      </div>
    </div>
  );
};

export default Services;
