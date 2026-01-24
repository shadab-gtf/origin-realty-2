import { motion } from 'framer-motion'
import { translate } from '../../Anim'

const MotionLi = motion.li

const listAnimationProps = {
  custom: [0.3, 0] as [number, number],
  variants: translate,
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
}

export default function Footer() {
  return (
    <div
      className="
        flex flex-wrap items-end
        text-[12px] uppercase
        m-1
        md:ml-19
        min-[1000px]:justify-start
      "
    >
      {/* Social Media */}
      <ul className="flex gap-5 overflow-hidden list-none text-white">
        <MotionLi {...listAnimationProps}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </MotionLi>

        <MotionLi {...listAnimationProps}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            X
          </a>
        </MotionLi>

        <MotionLi {...listAnimationProps}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </MotionLi>

        <MotionLi {...listAnimationProps}>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Dribbble
          </a>
        </MotionLi>
      </ul>
    </div>
  )
}
