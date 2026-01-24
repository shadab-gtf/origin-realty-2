"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  bg?: string;          
  text?: string;        
  hoverBg?: string;   
  hoverText?: string;  

  className?: string;
};

export default function Button({
  label,
  href,
  onClick,
  bg = "transparent",
  text = "#ffffff",
  hoverBg = "#ffffff",
  hoverText = "#000000",
  className = "",
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);


  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const strength = 0.6;
    const maxDistance = 120;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const force = 1 - distance / maxDistance;

        gsap.to(btn, {
          x: dx * force * strength,
          y: dy * force * strength,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(textRef.current, {
          x: -dx * force * 0.15,
          y: -dy * force * 0.15,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    const onLeave = () => {
      gsap.to([btn, textRef.current], {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1.4, 0.25)", 
      });
    };

    window.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);


  const ButtonEl = (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: {
          backgroundColor: bg,
          color: text,
        },
        hover: {
          backgroundColor: hoverBg,
          color: hoverText,
        },
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        relative
        overflow-hidden
        border
        border-current
        uppercase
        tracking-tight  
        text-xs
        px-8
        py-4
        cursor-pointer
        ${className}
      `}
      style={{
        borderColor: text,
      }}
    >
      <span ref={textRef} className="relative z-10 block">
        {label}
      </span>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{ButtonEl}</Link>;
  }

  return ButtonEl;
}
 


// uses  
{/* <Button
  label="Launch"
  bg="linear-gradient(135deg,#6b73ff,#000dff)"
  hoverBg="linear-gradient(135deg,#000dff,#6b73ff)"
  text="#ffffff"
  hoverText="#ffffff"
/> */}
{/* <Button
  label="View Project"
  bg="transparent"
  text="#E0D1B6"
  hoverBg="#E0D1B6"
  hoverText="#0b0b0b"
/> */}
{/* <Button
  label="Explore"
  bg="transparent"
  text="#000000"
  hoverBg="#000000"
  hoverText="#ffffff"
/> */}
{/* <Button
  label="Discover More"
  bg="transparent"
  text="#ffffff"
  hoverBg="#ffffff"
  hoverText="#000000"
/> */}
