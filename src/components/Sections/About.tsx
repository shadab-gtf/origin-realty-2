"use client";
import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !textRef.current ||
      !imageWrapRef.current ||
      !overlayTextRef.current
    )
      return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      /* =======================
       DESKTOP (PINNED)
    ======================== */
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Text moves out
        tl.to(
          textRef.current,
          {
            y: -520,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.2,
            ease: "power2.out",
          },
          0,
        );

        // Image expands
        tl.to(
          imageWrapRef.current,
          {
            width: "100%",
            height: "80vh",
            duration: 1.5,
            ease: "power2.out",
          },
          0,
        );

        // Overlay text
        tl.fromTo(
          overlayTextRef.current,
          {
            opacity: 0,
            y: 40,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.out",
          },
          0.25,
        );
      }

      /* =======================
       MOBILE (IMAGE ONLY)
    ======================== */
      if (isMobile) {
        // Image reveal
        gsap.fromTo(
          imageWrapRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.05,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 85%",
              end: "top 20%",
              scrub: true,
            },
          },
        );

        // Overlay text (slightly delayed)
        gsap.fromTo(
          overlayTextRef.current,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 45%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative bg-white
        px-5 sm:px-10 lg:px-24
        pt-24 pb-16
        min-h-[100vh]
        w-full overflow-hidden
      "
    >
      {/* TEXT */}
      <div
        ref={textRef}
        className="
          relative md:absolute
          md:top-[160px] md:left-[7%]
          max-w-[748px]
          z-10
        "
      >
        <span className="text-[#F1D8A8]text-sm font-bold">WHO WE ARE</span>

        <h2 className="text-[#231F20] text-[clamp(2rem,4vw,2.5rem)] font-serif mb-4">
          About Us
        </h2>

        <p className="text-base md:text-xl text-[#231F20] font-light">
          We are here to reimagine what it means to build around people. To
          shift the focus from structures to stories, from spaces to souls, from
          profit to purpose. For us, you are not the end user. You are the
          starting point. Every choice we make begins with one question: Will
          this make your life and your family's life better, healthier, and more
          meaningful?
        </p>

        <p className="mt-8 italic text-base text-[#231F20B2]">
          We’re not just changing skylines; we’re changing lives by creating
          ecosystems that breathe with you, spaces that heal, and designs that
          make mindful living effortless.
        </p>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-full flex justify-end mt-10 md:mt-0">
        <div
          ref={imageWrapRef}
          className="
            relative
            w-full md:w-[360px]
            h-[300px] md:h-[431px]
            overflow-hidden
          "
        >
          {/* OVERLAY TEXT */}
          <div
            ref={overlayTextRef}
            className="
              absolute inset-0 z-20
              flex flex-col items-center justify-center
              text-center px-6
              pointer-events-none
            "
          >
            <h2 className="text-white font-serif text-2xl md:text-[clamp(1.8rem,4vw,3rem)]">
              Designed for the Years Ahead
            </h2>
            <p className="mt-4 text-white/80 max-w-xl text-sm md:text-lg">
              A future-ready lifestyle rooted in clarity and purpose.
            </p>
          </div>

          <Image
            src="/bg/about-img.webp"
            alt="About"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
