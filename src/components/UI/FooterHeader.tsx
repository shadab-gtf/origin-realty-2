"use client";

import Image from "next/image";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function FooterHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
      <Image
        src="/footer-logo.png"
        alt="Footer logo"
        width={120}
        height={120}
        className="w-28 sm:w-32"
        priority
      />

      <div className="flex items-center gap-4 sm:gap-5">
        <SocialIcon
          href="https://instagram.com"
          ariaLabel="Visit us on Instagram"
        >
          <Instagram />
        </SocialIcon>

        <SocialIcon
          href="https://linkedin.com"
          ariaLabel="Visit us on LinkedIn"
        >
          <Linkedin />
        </SocialIcon>

        <SocialIcon
          href="https://facebook.com"
          ariaLabel="Visit us on Facebook"
        >
          <Facebook />
        </SocialIcon>

        <SocialIcon
          href="https://youtube.com"
          ariaLabel="Visit us on YouTube"
        >
          <Youtube />
        </SocialIcon>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="
        group
        flex items-center justify-center
        w-10 h-10 sm:w-11 sm:h-11
        rounded-full
        border border-white
        text-white/70
        transition-all duration-500
        ease-[cubic-bezier(0.19,1,0.22,1)]
        hover:bg-[#d6c29f]
        hover:text-[#1c1819]
        hover:border-[#d6c29f]
        sm:hover:-translate-y-1
        active:scale-95
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#d6c29f]
      "
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-500 group-hover:scale-110"
      >
        {children}
      </span>
    </Link>
  );
}
