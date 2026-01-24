"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoWrapRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };

          const startSize = desktop ? 300 : 120;
          const endSize = desktop ? 600 : window.innerWidth * 0.92;

          gsap.fromTo(
            videoWrapRef.current,
            {
              width: startSize,
              height: startSize,
              borderRadius: 24,
            },
            {
              width: endSize,
              height: endSize,
              borderRadius: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "top top",
                scrub: 1.6,
              },
            }
          );

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const velocity = self.getVelocity();

              gsap.to(videoWrapRef.current, {
                scale: 1 + Math.min(Math.abs(velocity) * 0.00025, 0.06),
                duration: 0.4,
                ease: "power3.out",
              });
            },
          });
        }
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
        min-h-[160vh]
        bg-[#0b0b0b]
        flex
        items-start
        justify-center
        pt-[30vh]
      "
    >
      <div
        ref={videoWrapRef}
        className="
          relative
          overflow-hidden
          will-change-[width,height,transform]
          bg-black
        "
        style={{
          width: 600,
          height: 600,
        }}
      >
        <video
          src="/Origin.mp4"
          autoPlay
          muted
          loop
        //   playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
