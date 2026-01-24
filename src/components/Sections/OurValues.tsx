"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isMobile: "(max-width: 639px)",
      },
      (ctx) => {
        const { isDesktop, isTablet } = ctx.conditions as any;

        
        if (isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              end: "bottom 98%",
              scrub: 1.8,
              onUpdate: (self) => {
                const progress = self.progress;
                const desc = document.querySelector(
                  ".values-desc",
                ) as HTMLElement;

                if (progress < 0.25) {
                  desc?.classList.add("line-clamp-2");
                } else {
                  desc?.classList.remove("line-clamp-2");
                }
              },
            },
          });

          tl.fromTo(
            canvasRef.current,
            { width: 690, height: 330 },
            {
              width: 1200,
              height: 500,
              ease: "none",
              modifiers: {
                width: (v) =>
                  Math.max(690, Math.min(1200, parseFloat(v))) + "px",
                height: (v) =>
                  Math.max(330, Math.min(500, parseFloat(v))) + "px",
              },
            },
            0,
          );

          tl.fromTo(".lux-text", { scale: 0.82 }, { scale: 1 }, 0);

          tl.fromTo(
            dividerRef.current,
            { scaleX: 0.85 },
            { scaleX: 1.1, ease: "none" },
            0,
          );

          ScrollTrigger.create({
            trigger: canvasRef.current,
            start: "top 40%",
            end: "bottom 20%",
            onEnter: () =>
              gsap.to(dividerRef.current, { opacity: 1, duration: 0.3 }),
            onLeave: () =>
              gsap.to(dividerRef.current, { opacity: 0, duration: 0.3 }),
            onEnterBack: () =>
              gsap.to(dividerRef.current, { opacity: 1, duration: 0.3 }),
            onLeaveBack: () =>
              gsap.to(dividerRef.current, { opacity: 0, duration: 0.3 }),
          });
        }

      
        if (!isDesktop) {
          if (!contentRef.current) return;

          const elements = gsap.utils.toArray(
            contentRef.current.querySelectorAll(".lux-text"),
          ) as HTMLElement[];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=120%",
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
            },
          });

          // Keep canvas stable
          tl.fromTo(
            canvasRef.current,
            {
              width: "100%",
              height: isTablet ? 460 : 500,
            },
            {
              width: "100%",
              height: isTablet ? 520 : 500,
              ease: "none",
            },
            0,
          );

          // Top to Bottom content reveal
          tl.fromTo(
            elements,
            {
              opacity: 0,
              y: 60,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              stagger: 0.15,
            },
            0.1,
          );
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen justify-center bg-[#CEB58D1A] px-4 pt-[20vh]"
    >
      <div
        ref={canvasRef}
        className="w-full bg-white"
        style={{ maxWidth: "1200px" }}
      >
        <div
          ref={contentRef}
          className="px-4 py-8 text-center sm:px-10 sm:py-14 lg:px-16 lg:py-20"
        >
          {/* Eyebrow */}
          <p className="lux-text mb-4 text-xs text-[#9E7C3A]">
            A PROMISE OF QUALITY
          </p>

          {/* Title */}
          <h2 className="lux-text font-serif text-[clamp(1.3rem,4vw,3rem)] leading-tight text-[#231F20]">
            Our Values
          </h2>

          {/* Description */}
          <p className="lux-text values-desc mx-auto mt-6 max-w-3xl text-[clamp(0.875rem,3.5vw,1.125rem)] leading-relaxed text-[#231F20]">
            We are creating a name synonymous with futuristic design and
            grounded research. With a commitment to transparency and a zero-debt
            approach, we prioritize customer attunement and sustainable growth.
            Our values are the foundation of every structure we build, ensuring
            that we deliver on our vision of creating a shift in the market.
          </p>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="lux-text mt-12 flex items-center justify-center gap-4 opacity-0 sm:mt-16 sm:gap-6"
          >
            <span className="hidden h-px flex-1 bg-[#d8c29d] sm:block" />

            <div className="relative h-40 w-40 sm:h-20 sm:w-40 lg:h-28 lg:w-56">
              <Image
                src="/shake2.png"
                alt="Handshake divider"
                fill
                sizes="700px"
                className="object-contain"
                priority
              />
            </div>

            <span className="hidden h-px flex-1 bg-[#d8c29d] sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
