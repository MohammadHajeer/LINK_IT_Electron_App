/* eslint-disable prettier/prettier */

import { motion } from 'framer-motion'

type Props = {
  icon: string
  alt: string
  id: string
  func: ({
    id,
    setLinks
  }: {
    id: string
    setLinks?: React.Dispatch<
      React.SetStateAction<
        {
          url: string
          name: string
          id: string
        }[]
      >
    >
  }) => void
  setLinks: React.Dispatch<
    React.SetStateAction<
      {
        url: string
        name: string
        id: string
      }[]
    >
  >
}

const LinkCardOption = ({ icon, alt, id, func, setLinks }: Props): JSX.Element => {
  return (
    <motion.div
      onClick={() => {
        func({ id, setLinks })
      }}
      //   onHoverStart={() => {
      //     setHover(true)
      //   }}
      //   onHoverEnd={() => {
      //     setHover(false)
      //   }}
      variants={childVariants}
      className="size-10 bg-[--main-bg-color] shadow-md rounded-full hover:bg-[--text-color] cursor-pointer z-10 p-2.5 transition-colors"
    >
      <img src={icon} alt={alt} className="size-full" />
    </motion.div>
  )
}

export default LinkCardOption

const childVariants = {
  hidden: { opacity: 0, y: 300, scale: 0 },
  show: { opacity: [1, 0.7, 1, 0.7, 1], y: 0, scale: [1, 0.8, 1.3, 0.8, 1] }
}
