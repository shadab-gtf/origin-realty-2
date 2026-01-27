// 'use client'

// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function LiveParallaxBackground() {
//   const imageRef = useRef<HTMLImageElement>(null)
//   const wrapperRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const img = imageRef.current
//     const wrapper = wrapperRef.current
//     if (!img || !wrapper) return

//     const isTouch = window.matchMedia('(pointer: coarse)').matches

//     gsap.set(img, {
//       transformStyle: 'preserve-3d',
//       transformOrigin: 'center bottom',
//       z: 120,
//       willChange: 'transform',
//     })

//     gsap.to(img, {
//       rotateX: -14,
//       rotateY: 4,
//       scale: 1.12,
//       z: 160,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: wrapper,
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: 1.4,
//       },
//     })

//     gsap.to(img, {
//       y: '-=6',
//       rotateY: '+=6',
//       duration: 10,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     })

//     const moveX = gsap.quickTo(img, 'x', {
//       duration: 1.2,
//       ease: 'power3.out',
//     })

//     const moveY = gsap.quickTo(img, 'y', {
//       duration: 1.2,
//       ease: 'power3.out',
//     })

//     const rotX = gsap.quickTo(img, 'rotateX', {
//       duration: 1.4,
//       ease: 'power3.out',
//     })

//     const rotY = gsap.quickTo(img, 'rotateY', {
//       duration: 1.4,
//       ease: 'power3.out',
//     })

//     const handleMouse = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 2
//       const y = (e.clientY / window.innerHeight - 0.5) * 2

//       moveX(-x * 45)
//       moveY(-y * 25)

//       rotY(gsap.utils.clamp(-20, 20, -x * 22))
//       rotX(gsap.utils.clamp(-14, 14, -y * 18))
//     }

//     window.addEventListener('mousemove', handleMouse)

//     let gyroEnabled = false

//     const requestPermission = async () => {
//       // iOS permission
//       // @ts-ignore
//       if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
//         // @ts-ignore
//         const permission = await DeviceOrientationEvent.requestPermission()
//         gyroEnabled = permission === 'granted'
//       } else {
//         gyroEnabled = true
//       }
//     }

//     if (isTouch) requestPermission()

//     const handleOrientation = (e: DeviceOrientationEvent) => {
//       if (!gyroEnabled) return

//       const beta = gsap.utils.clamp(-30, 30, e.beta || 0)
//       const gamma = gsap.utils.clamp(-30, 30, e.gamma || 0)

//       gsap.to(img, {
//         rotateX: -beta * 0.35,
//         rotateY: gamma * 0.5,
//         x: gamma * 1.5,
//         y: beta * 0.6,
//         duration: 0.8,
//         ease: 'power3.out',
//       })
//     }

//     if (isTouch) {
//       window.addEventListener('deviceorientation', handleOrientation)
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouse)
//       window.removeEventListener('deviceorientation', handleOrientation)
//     }
//   }, [])

//   return (
//     <section
//       ref={wrapperRef}
//       className="relative h-[800px] w-full overflow-hidden perspective-[2000px]"
//     >
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/bg/live.png')" }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/35" />

//       {/* Back Text */}
//       <h1 className="absolute inset-0 z-0 flex items-center justify-center text-center text-[clamp(6rem,18vw,13rem)] font-light leading-none text-white select-none pointer-events-none">
//         Design to Beyond <br />
//       </h1>

//       {/* Depth Shadow */}
//       <div className="absolute inset-0 z-[9] blur-2xl opacity-30 bg-black rounded-full scale-75 translate-y-20" />

//       {/* Foreground */}
//       <img
//         ref={imageRef}
//         src="/girl11.png"
//         alt="Foreground"
//         className="absolute -bottom-8 left-1/2 z-10 w-[500px] max-w-[95vw] -translate-x-1/2 object-bottom transform-gpu"
//       />
//     </section>
//   )
// }
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LiveParallaxBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imageRef.current;
    const text = textRef.current;
    if (!wrapper || !img || !text) return;

    const designed = text.querySelector(
      '[data-word="designed"]',
    ) as HTMLElement;
    const to = text.querySelector('[data-word="to"]') as HTMLElement;
    const belong = text.querySelector('[data-word="belong"]') as HTMLElement;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const mm = gsap.matchMedia();

    gsap.set(img, {
      transformStyle: "preserve-3d",
      transformOrigin: "center bottom",
      z: 120,
      willChange: "transform",
      force3D: true,
    });

    gsap.to(img, {
      rotateX: -14,
      rotateY: 4,
      scale: 1.12,
      z: 160,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4,
      },
    });

    gsap.to(img, {
      y: "-=6",
      rotateY: "+=6",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const moveX = gsap.quickTo(img, "x", { duration: 1.2, ease: "power3.out" });
    const moveY = gsap.quickTo(img, "y", { duration: 1.2, ease: "power3.out" });
    const rotX = gsap.quickTo(img, "rotateX", { duration: 1.4 });
    const rotY = gsap.quickTo(img, "rotateY", { duration: 1.4 });

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      moveX(-x * 45);
      moveY(-y * 25);
      rotY(gsap.utils.clamp(-20, 20, -x * 22));
      rotX(gsap.utils.clamp(-14, 14, -y * 18));
    };

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouse);
    }

    mm.add("(max-width: 767px)", () => {
      gsap.set([designed, to, belong], {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: (i) => i * 110,
        opacity: 1,
      });
    });

    mm.add("(min-width: 768px)", () => {
      gsap.set(wrapper, { backgroundColor: "#000" });

      gsap.set(designed, { top: "10%", left: "20%", xPercent: -50 });
      gsap.set(to, { top: "25%", left: "50%", xPercent: -50 });
      gsap.set(belong, { top: "40%", left: "75%", xPercent: -50 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.2,
          scrub: 1.4,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: false,
          invalidateOnRefresh: true,
        },
      });

      tl.to([designed, to, belong], { top: "6%", force3D: true }, 0);
      tl.to(designed, { xPercent: -16 }, 0);
      tl.to(to, { xPercent: -60 }, 0);
      tl.to(belong, { xPercent: -67 }, 0);
    });

    return () => {
      mm.revert();
      window.removeEventListener("mousemove", handleMouse);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(img);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative h-screen live-section w-full overflow-hidden bg-black perspective-[2000px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg/live.webp')" }}
      />
      <div className="absolute inset-0 bg-black/35" />
      <h1
        ref={textRef}
        className="absolute inset-0 z-10 text-white font-light pointer-events-none select-none"
      >
        <span
          data-word="designed"
          className="absolute text-[clamp(8rem,6vw,27rem)]"
        >
          Design
        </span>
        <span data-word="to" className="absolute text-[clamp(8rem,6vw,27rem)]">
          To
        </span>
        <span
          data-word="belong"
          className="absolute text-[clamp(8rem,6vw,27rem)]"
        >
          Belong
        </span>
      </h1>
      <div className="absolute inset-0 z-[9] blur-2xl opacity-30 bg-black scale-75 translate-y-20 rounded-full" />
      <Image
        ref={imageRef}
        src="/girl11.png"
        alt="Foreground"
        width={420}
        height={720}
        className="
    absolute -bottom-8 left-1/2 z-10
    max-w-[92vw]
    -translate-x-1/2
    object-bottom
    transform-gpu
  "
        draggable={false}
        priority
      />
    </section>
  );
}

// 'use client'

// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function LiveParallaxBackground() {
//   const wrapperRef = useRef<HTMLDivElement>(null)
//   const modelRef = useRef<HTMLDivElement>(null)
//   const imageRef = useRef<HTMLImageElement>(null)
//   const lightRef = useRef<HTMLDivElement>(null)
//   const shadowRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const wrapper = wrapperRef.current
//     const model = modelRef.current
//     const img = imageRef.current
//     const light = lightRef.current
//     const shadow = shadowRef.current

//     if (!wrapper || !model || !img || !light || !shadow) return

//     const isTouch = window.matchMedia('(pointer: coarse)').matches

//     /* ---------------- Base Setup ---------------- */
//     gsap.set(wrapper, { perspective: 2200 })
//     gsap.set(model, {
//       transformStyle: 'preserve-3d',
//       transformOrigin: 'center bottom',
//       z: 140,
//     })

//     gsap.set(img, {
//       transformStyle: 'preserve-3d',
//       transformOrigin: 'center bottom',
//     })

//     /* ---------------- Scroll Camera Motion ---------------- */
//     gsap.to(model, {
//       rotateX: -16,
//       rotateY: 6,
//       scale: 1.14,
//       z: 200,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: wrapper,
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: 1.4,
//       },
//     })

//     /* ---------------- Idle Breathing ---------------- */
//     gsap.to(model, {
//       y: '-=8',
//       rotateY: '+=6',
//       duration: 9,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     })

//     if (isTouch) return

//     /* ---------------- Mouse Driven Camera Orbit ---------------- */
//     const orbit = {
//       x: 0,
//       y: 0,
//     }

//     gsap.ticker.add(() => {
//       gsap.set(model, {
//         rotateY: orbit.x,
//         rotateX: orbit.y,
//       })

//       gsap.set(light, {
//         x: orbit.x * 3,
//         y: orbit.y * 3,
//       })

//       gsap.set(shadow, {
//         x: orbit.x * 6,
//         scale: 1 - Math.abs(orbit.y) * 0.03,
//       })
//     })

//     const handleMove = (e: MouseEvent) => {
//       const nx = (e.clientX / window.innerWidth - 0.5) * 2
//       const ny = (e.clientY / window.innerHeight - 0.5) * 2

//       orbit.x = gsap.utils.clamp(-22, 22, -nx * 22)
//       orbit.y = gsap.utils.clamp(-14, 10, -ny * 16)
//     }

//     window.addEventListener('mousemove', handleMove)

//     return () => {
//       window.removeEventListener('mousemove', handleMove)
//       gsap.ticker.remove(() => {})
//     }
//   }, [])

//   return (
//     <section
//       ref={wrapperRef}
//       className="relative h-[800px] w-full overflow-hidden bg-black"
//     >
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/bg/live.png')" }}
//       />
//       <div className="absolute inset-0 bg-black/35" />

//       {/* Back Text */}
//       <h1 className="absolute inset-0 z-0 flex items-center justify-center text-center text-[clamp(6rem,18vw,13rem)] font-light leading-none text-white select-none pointer-events-none">
//         Designed for <br /> the Years Ahead
//       </h1>

//       {/* Model Container */}
//       <div
//         ref={modelRef}
//         className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
//       >
//         {/* Fake Light / Specular */}
//         {/* <div
//           ref={lightRef}
//           className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-white/25 via-transparent to-transparent mix-blend-overlay"
//         /> */}

//         {/* PNG */}
//         <img
//           ref={imageRef}
//           src="/girl10.png"
//           alt="3D Model"
//           className="relative z-10 w-[520px] max-w-[95vw] object-bottom transform-gpu"
//         />
//       </div>

//       {/* Ground Shadow */}
//       <div
//         ref={shadowRef}
//         className="absolute bottom-20 left-1/2 z-[5] h-44 w-72 -translate-x-1/2 rounded-full bg-black/50 blur-3xl"
//       />
//     </section>
//   )
// }
