'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Stat from '../UI/Stat';

gsap.registerPlugin(ScrollTrigger);

export default function Advantage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

    // ✅ SAFE: window used inside effect
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const ctx = gsap.context(() => {
      /* ---------------- IMAGE PARALLAX ---------------- */
      gsap.fromTo(
        imageRef.current!,
        { yPercent: isMobile ? -3 : -6 },
        {
          yPercent: isMobile ? 3 : 6,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: isMobile ? 1 : 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      /* ---------------- CONTENT REVEAL ---------------- */
      const items = Array.from(contentRef.current!.children);

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
          },
        }
      );

      /* ---------------- CONTENT MICRO PARALLAX ---------------- */
      gsap.fromTo(
        contentRef.current!,
        { y: isMobile ? 0 : 6 },
        {
          y: isMobile ? -20 : -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{
          backgroundImage: "url('/bg/dwarka.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-[22vh] text-center text-white md:pt-[18vh]"
      >
        <span className="mb-4 text-sm font-bold tracking-normal text-[#d1b06b]">
          THE ORIGEN ADVANTAGE
        </span>

        <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.5rem)] leading-tight">
          Our Expertise
        </h2>

        <p className="mx-auto mb-10 max-w-[1082px] text-base font-light leading-relaxed md:text-xl">
          Our foundation is built on decades of real delivery and a legacy of
          business excellence. We lead with knowledge, creating human impact and
          increasing life value per square foot.
        </p>

        <div className="flex w-full max-w-[1082px] flex-col justify-between gap-5 md:flex-row md:gap-0">
          <Stat value="30 Years" label="Business Acumen" index={0} />
          <Stat value="500+ Projects" label="Combined Experience" index={1} />
          <Stat value="2 Generations" label="Business Excellence" index={2} />
        </div>
      </div>
    </section>
  );
}
