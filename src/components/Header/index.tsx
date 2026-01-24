"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { opacity, background } from "./Anim";
import Nav from "./Nav/Index";
import AnimatedPathLine from "../UI/AnimatedPathLine";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* ----------------------------------------
     FORCE initial state BEFORE paint (CRITICAL)
  ----------------------------------------- */
  useLayoutEffect(() => {
    if (!bgRef.current) return;

    gsap.set(bgRef.current, {
      opacity: 0,
    });
  }, []);

  /* ----------------------------------------
     Header background fade on scroll
  ----------------------------------------- */
  useEffect(() => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onEnter: () => {
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(bgRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  /* ----------------------------------------
     Velocity-based hide / show header
  ----------------------------------------- */
  useEffect(() => {
    if (!headerRef.current) return;

    const VELOCITY_THRESHOLD = 800;
    let isHidden = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          if (isActive) {
            gsap.to(headerRef.current, {
              yPercent: 0,
              duration: 0.3,
              ease: "power3.out",
            });
            isHidden = false;
            return;
          }

          // fast scroll down → hide
          if (velocity > VELOCITY_THRESHOLD && !isHidden) {
            isHidden = true;
            gsap.to(headerRef.current, {
              yPercent: -100,
              duration: 0.55,
              ease: "power4.out",
            });
          }

          // scroll up → show
          if (velocity < -200 && isHidden) {
            isHidden = false;
            gsap.to(headerRef.current, {
              yPercent: 0,
              duration: 0.45,
              ease: "power3.out",
            });
          }
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 will-change-transform"
      >
        {/* Background blur (initially hidden) */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-black backdrop-blur-md pointer-events-none"
        />

        {/* Top bar */}
        <div
          className="
            relative z-20 pointer-events-auto
            px-4 sm:px-6 lg:px-16
            py-4
            flex items-center justify-between
            uppercase text-[12px] sm:text-[14px]
          "
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/or.png"
              alt="Company logo"
              width={300}
              height={50}
              sizes="(max-width: 768px) 140px, 180px"
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          {/* Menu Button */}
          <div
            onClick={() => setIsActive(!isActive)}
            className="
              flex items-center gap-2 cursor-pointer select-none
              border border-white hover:border-[#231F20]
              px-5 py-2 rounded-3xl
              bg-transparent hover:bg-[#231F20]
              transition-colors duration-300 ease-out
            "
          >
            {/* Burger */}
            <div
              className={`
                relative w-9
                before:content-[''] before:block before:h-px before:w-full before:bg-white
                before:relative before:top-1
                after:content-[''] after:block after:h-px after:w-full after:bg-white
                after:relative after:-top-1
                before:transition-all after:transition-all
                before:duration-700 after:duration-700
                before:ease-[cubic-bezier(0.76,0,0.24,1)]
                after:ease-[cubic-bezier(0.76,0,0.24,1)]
                ${
                  isActive
                    ? "before:-rotate-45 before:top-px after:rotate-45 after:-top-px"
                    : ""
                }
              `}
            />

            {/* Text */}
            <div className="relative text-white">
              <motion.span
                initial={false}
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
              >
                Menu
              </motion.span>

              <motion.span
                initial={false}
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                className="absolute left-0 top-0"
              >
                Close
              </motion.span>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className="
            absolute bottom-0 left-4 right-4
            sm:left-6 sm:right-6
            lg:left-16 lg:right-16
            h-px pointer-events-none z-10
          "
        >
          <AnimatedPathLine />
        </div>

        {/* Overlay */}
        <motion.div
          variants={background}
          initial="closed"
          animate={isActive ? "open" : "closed"}
          className="absolute left-0 top-full w-full bg-[#0606065d]"
        />

        {/* Nav */}
        <AnimatePresence mode="wait">
          {isActive && <Nav />}
        </AnimatePresence>
      </header>
    </>
  );
}
