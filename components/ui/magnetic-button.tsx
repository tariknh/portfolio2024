"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const SPRING_CONFIG = { damping: 80, stiffness: 600 };

type MagneticButtonType = {
  children: React.ReactNode;
  distance?: number;
  className?: string;
};

const MagneticButton: React.FC<MagneticButtonType> = ({
  children,
  distance = 1.2,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        if (isHovered) {
          x.set(distanceX * distance);
          y.set(distanceY * distance);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    document.addEventListener("mousemove", calculateDistance);

    return () => {
      document.removeEventListener("mousemove", calculateDistance);
    };
  }, [ref, isHovered]);

  return (
    <motion.div
      className={cn(className, "cursor-pointer")}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        x: springX,
        y: springY,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
