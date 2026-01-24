import { motion } from 'framer-motion'
import { opacity } from '../../Anim'

type Props = {
  src: string
  isActive: boolean
  index: number
}

const masks = [
  '/mask/Flower.svg',
  '/mask/Gum.svg',
  '/mask/Hexagon.svg',
  '/mask/Square.svg',
]

export default function MaskedImage({ src, isActive, index }: Props) {
  const mask = masks[index % masks.length]

  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? 'open' : 'closed'}
      className="
        hidden
        min-[1000px]:block
        min-[1000px]:relative
        min-[1000px]:w-120
        min-[1000px]:h-110
        overflow-hidden
      "
      style={{
        WebkitMaskImage: `url(${mask})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskImage: `url(${mask})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
      }}
    >
      {/* Image layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/${src})`,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  )
}
