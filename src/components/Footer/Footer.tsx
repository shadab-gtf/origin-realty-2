"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/UI/Button";
import FooterHeader from "../UI/FooterHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          duration: 1.4,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#1c1819] text-white overflow-hidden"
    >
      <div ref={innerRef} className="px-6 sm:px-10 lg:px-24 pt-28 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#d6c29f] uppercase tracking-widest text-xs mb-4">
            Start Your Journey
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl mb-6">Contact Us</h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Join us as we unfold the next chapter of real estate and redefine
            modern living. Reach out to learn more about our upcoming vision at
            Sector 88A, Gurugram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {[
            { label: "Name", type: "text" },
            { label: "Email", type: "email" },
            { label: "Phone", type: "tel" },
          ].map(({ label, type }) => {
            const id = label.toLowerCase();

            return (
              <div key={label} className="relative">
                <label htmlFor={id} className="text-xs uppercase text-white/70">
                  {label}
                </label>

                <input
                  id={id}
                  name={id}
                  type={type}
                  className="
            w-full
            bg-transparent
            border-b
            border-white/30
            py-2
            mt-2
            outline-none
            text-white
            placeholder:text-white/40
          "
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mb-24">
          <Button
            label="Request a Callback"
            bg="#d6c29f"
            text="#1c1819"
            hoverBg="#ffffff"
            hoverText="#1c1819"
          />
        </div>

        <div className="w-full h-px bg-white/15 mb-20" />

        <FooterHeader />
        <div className="relative">
          <div
            className="absolute inset-0 bg-center bg-contain  "
            style={{
              backgroundRepeat: "no-repeat",
              backgroundImage: "url('/bg/about-bg.webp')",
            }}
          />

          <div className="absolute inset-0 bg-[#1c1819]/80 backdrop-blur-[1px]" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm px-6 lg:px-0 py-20">
            <FooterColumn
              title="The Company"
              items={["Our Story", "Leadership", "Expertise", "Careers"]}
            />
            <FooterColumn
              title="The Product"
              items={["Sector 88A", "Upcoming Visions", "Customer Portal"]}
            />
            <FooterColumn
              title="Knowledge Hub"
              items={["8 Dimensions", "News & Media", "Sustainability"]}
            />
            <FooterColumn
              title="Governance"
              items={[
                "RERA Compliance",
                "Public Notices",
                "Privacy & Terms",
                "Contact Us",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#d6c29f] text-[#1c1819] text-xs py-4">
        <div className="px-6 sm:px-10 lg:px-24 w-full flex flex-col sm:flex-row justify-between gap-2">
          <span>Design to Belong</span>
          <span>© 2026 Origen Realty | All Rights Reserved</span>
          <span>Curated by: GTF Technologies</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[#CEB58D] uppercase tracking-wide mb-4 text-xl">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
