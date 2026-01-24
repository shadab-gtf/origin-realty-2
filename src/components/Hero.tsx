"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./UI/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        y: "-2%",
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      gsap.to(titleRef.current, {
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(descRef.current, {
        y: -32,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-svh w-full overflow-hidden">
      {/* video background  */}
       <video
        ref={videoRef}
        aria-hidden="true"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          will-change-transform
        "
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* overlay  */}
      <div
        className="
          absolute inset-0 z-10
          bg-gradient-to-t
          from-black/70
          via-black/80
          to-transparent
        "
      />

      {/* bottom content area  */}
      <div className="relative z-20 h-full flex items-end pb-16 sm:pb-20 px-6 sm:px-10 lg:px-24">
        <div
          className="
      w-full
      flex flex-col
      lg:flex-row
      lg:items-end
      lg:justify-between
      gap-10
    "
        >
          {/* left content  */}
          <div className="max-w-[820px]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="
          block
          mb-4
          text-sm 
          font-bold
          uppercase
          text-white
        "
            >
              From Real Estate to Real Living
            </motion.span>

            {/* Title */}
            <motion.h1
              ref={titleRef}
              initial={{
                opacity: 0,
                y: 40,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
          text-white
          font-light
          tracking-tight
          text-[42px]
          sm:text-[56px]
          md:text-[68px]
          lg:text-[82px]
          leading-[1.04]
          will-change-transform
        "
            >
              Built Around Life
            </motion.h1>

            {/* Description */}
            <motion.p
              ref={descRef}
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
          mt-6
          text-white
          text-base
          sm:text-lg
          lg:text-xl
          max-w-[520px]
          leading-relaxed
          font-medium
          will-change-transform
        "
            >
              Redefine Real Estate with our expertise to build spaces that
              transform lives.
            </motion.p>
          </div>

          {/* cta button  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="
        flex
        lg:items-end
      "
          >
            <Button
              label="Discover More"
              bg="transparent"
              text="#ffffff"
              hoverBg="#ffffff"
              hoverText="#000000"
            />
            {/* <Button
              label="REGISTER FOR EARLY ACCESS"
              bg="#CEB58D"
              text="#231F20"
              hoverBg="#ffffff"
              hoverText="#000000"
            /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
