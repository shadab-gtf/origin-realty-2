"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  "/logos/haldiram.png",
  "/logos/mcdonald.png",
  "/logos/nirula.png",
  "/logos/pizza-hut-red.png",
  "/logos/ambience.png",
  "/logos/yamaha.png",
];

export default function Beyond() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          },
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const track = marqueeRef.current;

    const tl = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "linear",
    });

    const stop = () => tl.pause();
    const play = () => tl.resume();

    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", play);

    return () => {
      track.removeEventListener("mouseenter", stop);
      track.removeEventListener("mouseleave", play);
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f4ef] py-28 md:py-36"
    >
      <div className="relative z-10  px-6 text-center">
        <span className="mb-4 inline-block text-sm tracking-normal font-bold text-[#7b6b51]">
          BEYOND BRAND ASSOCIATIONS
        </span>

        <h2
          ref={titleRef}
          className="mx-auto max-w-4xl text-[clamp(2rem,4vw,2.1rem)] font-serif leading-tight text-[#231F20]"
        >
          Designing Experiences, Not Just Spaces
        </h2>

        <p
          ref={textRef}
          className="mx-auto mt-6 max-w-4xl text-[15px] leading-relaxed text-[#231F20] md:text-base"
        >
          Our work with India’s most influential brands has shaped a disciplined
          design intelligence—one that balances scale, precision, and emotional
          resonance. Every environment we create is informed by operational
          excellence and elevated by lifestyle thinking.
        </p>

        {/* marquee   */}
        <div
          className="
    relative mt-20 overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
    [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
  "
        >
          <div
            ref={marqueeRef}
            className="flex w-max items-center gap-14 will-change-transform"
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
                  relative h-12 w-28 md:h-20 md:w-32
                  opacity-80 hover:opacity-100
                  transition-all duration-500 ease-out
                  "
                // filter invert grayscale
                // hover:invert-0 hover:grayscale-0
                  > 
                  {/* divider  */}
                  <div className="h-full w-px -mx-10 bg-[#231F20] rounded-3xl">  </div>
                <Image src={logo} alt="" fill className="object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
