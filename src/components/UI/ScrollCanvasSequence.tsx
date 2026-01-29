"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_FRAMES = 486;
const MOBILE_FRAMES = 486;  
const START_FRAME = 6;
export default function ScrollCanvasSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current) return;

    const isMobile = window.innerWidth < 768;
    const frameCount = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const ctx = context;

    const images: HTMLImageElement[] = [];
     const frame = { value: START_FRAME };
    let lastFrame = -1;

    /* ---------------- RESIZE ---------------- */
    const resize = () => {
      const dpr = isMobile ? 1.3 : Math.min(window.devicePixelRatio, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    resize();
    window.addEventListener("resize", resize);
    //    load
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/Origin/Origin_${String(i).padStart(5, "0")}.jpg`;
      img.decode().catch(() => {});
      img.onload = () => {
        loaded++;
        if (loaded === 1) render();
      };
      images.push(img);
    }

    //    render
    function render() {
      const index = Math.round(frame.value);
      if (index === lastFrame) return;
      lastFrame = index;

      const img = images[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      //  responsive
      const scale = isMobile
        ? Math.min(vw / img.width, vh / img.height) * 0.95
        : Math.max(vw / img.width, vh / img.height);

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const x = (vw - drawWidth) / 2;
      const y = (vh - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }

    //   scroll
    gsap.to(frame, {
      value: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? '+=600%' : '+=900%',
        scrub: isMobile ? 2 : 2.5,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
      },
      onUpdate: render,
    });

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </section>
  );
}
