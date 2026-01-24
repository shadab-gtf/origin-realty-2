"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Stat from "../UI/Stat";

gsap.registerPlugin(ScrollTrigger);

export default function Advantage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // IMAGE PARALLAX
      gsap.fromTo(
        imageRef.current,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        },
      );

      const items = contentRef.current
        ? Array.from(contentRef.current.children)
        : [];

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
          },
        },
      );

      // CONTENT MICRO PARALLAX (LUXURY)
      gsap.fromTo(
        contentRef.current,
        { y: 4 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] w-full overflow-hidden "
    >
      {/* ---------------- Background Image ---------------- */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{
          backgroundImage: "url('/bg/dwarka.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ---------------- Content ---------------- */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-[22vh] text-center text-white md:pt-[18vh]"
      >
        <span className="mb-4 tracking-normal text-sm font-bold text-[#d1b06b]">
          THE ORIGEN ADVANTAGE
        </span>

        <h2 className=" text-[clamp(2rem,4vw,2.5rem)] font-serif mb-4 leading-tight text-white">
          Our Expertise
        </h2>

        <p className="mx-auto mb-10 max-w-[1082px] font-light text-base leading-relaxed text-white md:text-xl">
          Our foundation is built on decades of real delivery and a legacy of
          business excellence. We lead with knowledge, creating human impact and
          increasing life value per square foot. Through detail-driven
          construction and a foundation of deep industry expertise.
        </p>

        {/* ---------------- Stats ---------------- */}
        <div className=" w-full max-w-[1082px] flex md:flex-row flex-col gap-5 md:gap-0   justify-between  ">
          <Stat value="30 Years" label="Business Acumen"  index={0}/>
          <Stat value="500+ Projects" label="Combined Experience"  index={1}/>
          <Stat value="2 Generations" label="Business Excellence"  index={2}/>
        </div>
      </div>
    </section>
  );
}


