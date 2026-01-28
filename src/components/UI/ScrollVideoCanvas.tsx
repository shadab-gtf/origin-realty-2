// Much lighter replacement version

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !sectionRef.current) return
    video.preload = 'auto' 
    video.muted = true
    video.playsInline = true

    let reqId: number | null = null

    const updateFrame = () => {
     
      reqId = null
    }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${1390 * 50}px`, 
      scrub: 2, 
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const targetTime = self.progress * video.duration

        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime
        }

        if (!reqId) reqId = requestAnimationFrame(updateFrame)
      },
    })

    return () => {
      if (reqId) cancelAnimationFrame(reqId)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full  h-screen bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        src="/Origin.mp4"   
        playsInline
        muted
        preload="auto"
      />
    </section>
  )
}