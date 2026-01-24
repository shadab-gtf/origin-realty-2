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
    let bgY = 0;
    let overlayY = 0;
    let contentY = 0;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: false,
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        // BACKGROUND (deepest layer)
        bgY += velocity * 0.0004;
        bgY = gsap.utils.clamp(-140, 140, bgY);

        // OVERLAY (slower, softer)
        overlayY += velocity * 0.00018;
        overlayY = gsap.utils.clamp(-70, 70, overlayY);

        // CONTENT (almost static – luxury)
        contentY += velocity * 0.00008;
        contentY = gsap.utils.clamp(-25, 25, contentY);

        gsap.to(bgRef.current, {
          y: bgY,
          scale: 1.1,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.to(overlayRef.current, {
          y: overlayY,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.to([headingRef.current, textRef.current], {
          y: contentY,
          duration: 0.9,
          ease: "power3.out",
        });
      },
    });

    /* TEXT REVEALS (keep elegant & slow) */
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
      { opacity: 0, y: 24 },
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

    /* MICRO OPACITY BREATHING */
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(textRef.current, {
          opacity: gsap.utils.interpolate(0.88, 1, self.progress),
          duration: 0.2,
          ease: "none",
        });
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
