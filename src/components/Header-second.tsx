"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fullLogoRef = useRef<HTMLDivElement>(null);
  const iconLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top+=80 top",
          end: "top+=81 top",
          toggleActions: "play none reverse none",
        },
      });

      tl.to(bgRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      tl.to(
        fullLogoRef.current,
        {
          opacity: 0,
          y: -6,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        iconLogoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
    >
      <div
        ref={bgRef}
        className="
    absolute inset-0
    bg-white/5
    backdrop-blur-sm
    opacity-0
  "
      />

      <div
        className="
          relative
          pointer-events-auto
          px-6 sm:px-10 lg:px-24
          py-5
          flex items-center justify-between
          text-[#f5e8d1]
        "
      >
        <div className="flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex flex-col gap-1.25 ">
              <span className="w-10 h-0.5 bg-[#f5e8d1]" />
              <span className="w-10 h-0.5 bg-[#f5e8d1]" />
            </div>
            <span>Menu</span>
          </div>

          <span className="hidden sm:block">
            <Link href="/residences">Residences</Link>
          </span>
        </div>

        <div className="relative h-8 w-35 flex items-center justify-center">
          <div
            ref={fullLogoRef}
            className="absolute inset-0 mr-10 flex items-center justify-center"
          >
            <Image
              src="/logo.svg"
              alt="Springs"
              width={140}
              height={32}
              priority
              className="object-contain sm:h-auto h-8 "
            />
          </div>

          <div
            ref={iconLogoRef}
            className="absolute inset-0 mr-24 flex items-center justify-center opacity-0 translate-y-2"
          >
            <Image
              src="/logo-icon.png"
              alt="Springs Icon"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase">
          <Link href="/contact"> Contact</Link>
        </div>
      </div>
    </header>
  );
}
