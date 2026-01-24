"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Integrity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { y: 0, scale: 1.1 },
        {
          y: -120,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        {
          y: 80,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[550px] w-full overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg/integrity2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-tight tracking-tight text-white"
          >
            Integrity in Every Detail
          </h2>

          <p
            ref={textRef}
            className="mt-6 text-[clamp(1rem,2vw,1.2rem)] font-light leading-relaxed text-white/80"
          >
            Where transparency, quality, and care converge.
          </p>
        </div>
      </div>
    </section>
  );
}
