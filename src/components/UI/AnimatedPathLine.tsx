"use client";

import { useRef, useEffect } from "react";

export default function AnimatedPathLine() {
  const pathRef = useRef<SVGPathElement | null>(null);

  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress: number) => {
    if (!pathRef.current) return;

    const width = window.innerWidth * 0.7;

    pathRef.current.setAttribute(
      "d",
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    );
  };

  const lerp = (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b;
  };

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pathRef.current) return;

    const { movementY, clientX } = e;
    const bounds = pathRef.current.getBoundingClientRect();

    const relativeX = (clientX - bounds.left) / bounds.width;

    if (relativeX < 0.2 || relativeX > 0.8) return;

    x = (relativeX - 0.2) / 0.6;

    progress += movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);

    progress = lerp(progress, 0, 0.025);
    time += 0.2;

    setPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className="relative w-full h-[1px] sm:block hidden mb-5 pointer-events-none">
      {/* Interaction Layer */}
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="
          relative z-[1]
          w-full h-10
          -top-[20px]
          hover:h-[500px]
          hover:-top-[250px]
          transition-all
          duration-300
          ease-in-out
          pointer-events-auto
        "
      />

      {/* SVG Path */}
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        className="absolute top-[-250px] w-full h-[500px]"
      >
        <path
          ref={pathRef}
          className="stroke-white stroke-[1px] fill-none"
        />
      </svg>
    </div>
  );
}
