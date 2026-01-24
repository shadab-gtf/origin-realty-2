'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'

const images = [
  'img-1.jpg',
  'img-2.jpeg',
  'img-3.jpeg',
  'img-4.jpeg',
  'img-2.jpeg',
  'img-3.jpeg',
  'img-4.jpeg',
  'img-2.jpeg',
  'img-3.jpeg',
  'img-4.jpeg',
  'img-2.jpeg',
  'img-3.jpeg',
  'img-4.jpeg',
]

export default function ProjectGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight)
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  return (
    <main className="bg-[#a1b584] text-[#173327]">
      {/* TOP TITLE */}
      <section className="h-screen flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(3rem,10vw,9rem)] font-semibold tracking-tight text-center"
        >
          Selected Projects
        </motion.h1>
      </section>

      {/* GALLERY */}
      <div
        ref={galleryRef}
        className="relative h-[175vh] flex gap-[2vw] p-[2vw] overflow-hidden"
      >
        <Column images={images.slice(0, 3)} y={y1} top="-45%" />
        <Column images={images.slice(3, 6)} y={y2} top="-95%" />
        <Column images={images.slice(6, 9)} y={y3} top="-45%" />
        <Column images={images.slice(9, 12)} y={y4} top="-75%" />
      </div>

      {/* BOTTOM TEXT */}
      <BottomText />
    </main>
  )
}

/* --------------------------------
   COLUMN
--------------------------------- */
function Column({
  images,
  y,
  top,
}: {
  images: string[]
  y: any
  top: string
}) {
  return (
    <motion.div
      style={{ y, top }}
      className="relative flex flex-col gap-[2vw] w-1/4 min-w-63 h-full"
    >
      {images.map((src, i) => (
        <MaskedImage key={i} src={src} />
      ))}
    </motion.div>
  )
}

/* --------------------------------
   IMAGE MASK REVEAL
--------------------------------- */
function MaskedImage({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-15%',
  })

  return (
    <div
      ref={ref}
      className="relative w-full h-full rounded-[1vw] overflow-hidden"
    >
      {/* IMAGE */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src={`/${src}`}
          alt="project image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </motion.div>

      {/* MASK */}
      <motion.div
        initial={{ y: '0%' }}
        animate={isInView ? { y: '-100%' } : {}}
        transition={{
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0 bg-[#ffffff] z-10"
      />
    </div>
  )
}

/* --------------------------------
   BOTTOM TEXT (WORD REVEAL)
--------------------------------- */
function BottomText() {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const text =
    'Each project represents a focused exploration of design, motion, and interaction. From concept to execution, the goal is always clarity, emotion, and performance — creating digital experiences that feel both intuitive and memorable.'

  return (
    <section className="h-screen flex items-center justify-center px-6">
      <motion.p
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="max-w-6xl text-center text-lg md:text-5xl leading-6 md:leading-14"
      >
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: i * 0.03,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </section>
  )
}
