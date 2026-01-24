"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/UI/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      let bgY = 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          bgY += velocity * 0.0004;
          bgY = gsap.utils.clamp(-120, 120, bgY);

          gsap.to(bgRef.current, {
            y: bgY,
            scale: 1.12,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 48,
          filter: "blur(14px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
        },
      ).fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 32,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power3.out",
        },
        "-=1",
      );

      if (statsRef.current) {
        const items = Array.from(statsRef.current.children);

        gsap.fromTo(
          items,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.25,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          },
        );
      }

      gsap.fromTo(
        locationsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: locationsRef.current,
            start: "top 90%",
          },
        },
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
        min-h-screen
        overflow-hidden
        flex
        flex-col
        justify-center
        bg-[#231F20E5]
        text-white
      "
    >
      <div
        ref={bgRef}
        className="
          absolute inset-0
          bg-cover bg-center
          will-change-transform
          bg-[#231F20]
        "
        // style={{
        //   backgroundImage: "url('/bg/vision.png')",
        // }}
      />

      <div className="absolute inset-0 bg-[#231F20E5]/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-[#CEB58D] uppercase font-semibold tracking-normal text-sm mb-6">
          The Future of Living
        </p>

        <h2
          ref={headingRef}
          className="
           text-white
            font-serif
            text-2xl
            md:text-3xl
            lg:text-[40px]
            leading-tight
            mb-8
          "
        >
          A New Vision Begins to Rise
        </h2>

        <p
          ref={textRef}
          className="
            mx-auto
            text-white/85
            font-normal
            text-base
            leading-[24px]
            sm:text-lg
            sm:leading-[30px]
            sm:font-light
            max-w-[92%]
            sm:max-w-5xl
            mb-12
            sm:mb-16
          "
        >
          At Sector 88A, Origen unfolds the culmination of 30 years of business
          acumen. We are shifting from structures to stories with a
          human-centric vision where real estate is designed like a science and
          lived as an upgrade. Here, we build beyond four walls to create
          ecosystems that breathe with you.
        </p>

        <div
          ref={statsRef}
          className="
            grid
            grid-cols-3
            gap-6
            sm:gap-12
            mb-10
            sm:mb-16
          "
        >
          <div>
            <p className="text-[#CEB58D] text-lg sm:text-2xl font-serif">
              8.265 Acres
            </p>
            <p className="text-white/60 text-xs tracking-tight sm:text-sm mt-1">Land Parcel</p>
          </div>

          <div>
            <p className="text-[#CEB58D] text-lg sm:text-2xl font-serif">
              Sector 88A
            </p>
            <p className="text-white/60 text-xs tracking-tight sm:text-sm mt-1">Gurugram</p>
          </div>

          <div>
            <p className="text-[#CEB58D] text-lg sm:text-2xl font-serif">
              30 Years
            </p>
            <p className="text-white/60 text-xs tracking-tight sm:text-sm mt-1">
              Business Acumen
            </p>
          </div>
        </div>
      </div>

      <div
        ref={locationsRef}
        className="
          relative z-10
          w-full
          flex
          flex-wrap
          justify-between
          gap-2
          px-4 sm:px-16
          py-4
          bg-[#231F20]
          text-base
          text-white
          tracking-[0.5%]
          mb-10
        "
      >
        <span>IGI Airport – 15 Mins</span>
        <span>|</span>
        <span>DLF Corporate Greens – 10 Mins</span>
        <span>|</span>
        <span>Cyber Hub – 30 Mins</span>
        <span>|</span>
        <span>Millennium City Centre – 30 Mins</span>
      </div>
      <div className="flex justify-center mt-10 ">
        <Button
          label="Register for Early Access"
          href="/contact"
          bg="#CEB58D"
          text="#231F20"
          hoverBg="#ffffff"
          hoverText="#231F20"
        />
      </div>
    </section>
  );
}
