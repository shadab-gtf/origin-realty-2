"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string;
  label: string;
  index: number;
}

export default function Stat({ value, label, index }: StatProps) {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numberRef.current) return;

    const el = numberRef.current;
    const target = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
      delay: index * 0.25, // luxury stagger
    });

    // Blur + fade reveal
    tl.fromTo(
      el,
      {
        opacity: 0,
        y: 14,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Counter animation (overlapping)
    tl.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 1.8,
        ease: "power3.out",
        snap: { innerText: 1 },
        onUpdate: () => {
          el.innerText = Math.floor(Number(el.innerText)) + suffix;
        },
      },
      "-=0.7"
    );

    return () => {
      tl.kill();
    };
  }, [value, index]);

  return (
    <div className="text-center">
      <div
        ref={numberRef}
        className="font-serif text-3xl md:text-[33.14px]"
      >
        {value}
      </div>

      <div className="mt-2 text-base md:text-[18.94px] tracking-[0.5%] text-white">
        {label}
      </div>
    </div>
  );
}
