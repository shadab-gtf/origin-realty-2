import { motion } from 'framer-motion'
import Link from 'next/link'
import { blur, translate } from '../../Anim'

type LinkItem = {
  title: string
  href: string
}

type SelectedLink = {
  isActive: boolean
  index: number
}

type BodyProps = {
  links: LinkItem[]
  selectedLink: SelectedLink
  setSelectedLink: (value: SelectedLink) => void
}

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
}: BodyProps) {
  const getChars = (word: string) => {
    return word.split('').map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        custom={[i * 0.02, (word.length - i) * 0.01] as [number, number]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {char}
      </motion.span>
    ))
  }

  return (
    <div className="flex flex-wrap mt-10 md:mx-18 min-[1000px]:mt-20 min-[1000px]:max-w-300">
      {links.map((link, index) => {
        const { title, href } = link

        return (
          <Link
            key={`l_${index}`}
            href={href}
            className="uppercase text-white no-underline"
          >
            <motion.p
              onMouseOver={() =>
                setSelectedLink({ isActive: true, index })
              }
              onMouseLeave={() =>
                setSelectedLink({ isActive: false, index })
              }
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? 'open'
                  : 'closed'
              }
              className="
                flex overflow-hidden
                m-0
                text-[32px] font-light
                pr-7.5 pt-2.5
                min-[1000px]:text-[5vw]
                min-[1000px]:pr-[2vw]
              "
            >
              {getChars(title)}
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}
