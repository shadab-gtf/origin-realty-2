"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Purpose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

 useEffect(() => {
  if (
    !sectionRef.current ||
    !bgRef.current ||
    !overlayRef.current ||
    !headingRef.current ||
    !textRef.current
  )
    return;

  const ctx = gsap.context(() => {
    /* ===============================
       DEEP LUXURY PARALLAX LAYERS
    =============================== */

    // Background — deepest & slowest
    gsap.fromTo(
      bgRef.current,
      { y: -80, scale: 1.15 },
      {
        y: 80,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2, // smooth cinematic scrub
        },
      }
    );

    // Overlay — soft glass / mist
    gsap.fromTo(
      overlayRef.current,
      { y: -40 },
      {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    // Content — almost static (luxury rule)
    gsap.fromTo(
      [headingRef.current, textRef.current],
      { y: 20 },
      {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      }
    );

    /* ===============================
       TEXT REVEALS (ELEGANT)
    =============================== */

    gsap.fromTo(
      headingRef.current,
      { y: "120%" },
      {
        y: "0%",
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );

    /* ===============================
       MICRO OPACITY BREATHING
    =============================== */

    gsap.to(textRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        h-screen
        overflow-hidden
        flex
        items-center
        justify-center
        bg-[#0e0c0b]
        text-white
      "
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/bg/vision2.png')" }}
      />

      <div
        ref={overlayRef}
        className="
          absolute inset-0
         bg-black/30
          will-change-transform
        "
      />

      <div className="relative z-10 px-6 sm:px-10 lg:px-20 text-center max-w-4xl">
        <div className="overflow-hidden mb-6">
          <motion.h2
            ref={headingRef}
            className="
              font-serif
               text-2xl
              md:text-3xl
              lg:text-[40px]
              leading-tight
              will-change-transform
            "
          >
            Designed for the Years Ahead
          </motion.h2>
        </div>

        <p
          ref={textRef}
          className="
            mx-auto
            text-white/90
            text-base
            sm:text-base
            md:text-lg
            leading-[24px]
            sm:leading-[28px]
            max-w-[92%]
            sm:max-w-2xl
          "
        >
          A future-ready lifestyle rooted in clarity and purpose.
        </p>
      </div>
    </section>
  );
}
