"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BreathingSpaces() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: "-10%",
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 36,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
        },
      ).fromTo(
        descRef.current,
        {
          opacity: 0,
          y: 24,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.8",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        h-svh
        overflow-hidden
        flex
        items-center
        justify-center
        bg-black
      "
    >
      <div
        ref={bgRef}
        className="
          absolute inset-0
          bg-cover bg-center
          will-change-transform
        "
        style={{
          backgroundImage: "url('/bg/featured-bg.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-6">
        <h2
          ref={titleRef}
          className="
            text-white
            font-serif
             text-2xl
            md:text-3xl
            lg:text-[40px]
            leading-tight
            mb-6
            will-change-transform
          "
        >
          Spaces That Breathe With You
        </h2>

        <p
          ref={descRef}
          className="
            text-white  
            text-base
            md:text-lg
            max-w-[520px]
            mx-auto
            leading-relaxed
            will-change-transform
          "
        >
          Design guided by human rhythm, not excess.
        </p>
      </div>
    </section>
  );
}
