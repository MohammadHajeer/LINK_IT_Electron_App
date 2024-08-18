/* eslint-disable prettier/prettier */

import { motion } from 'framer-motion'
import plus from '../assets/plus.svg'
import { useState } from 'react'
import LinkCardForm from './LinkCardForm'
import { createPortal } from 'react-dom'

const AddLinkCard = ({
  setLinks
}: {
  setLinks: React.Dispatch<
    React.SetStateAction<
      {
        url: string
        name: string
      }[]
    >
  >
}): JSX.Element => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <motion.div
        layout
        onClick={() => setToggle(true)}
        className="flex flex-col justify-center gap-2 items-center rounded-lg p-6 bg-[--main-bg-color] shadow-xl cursor-pointer group"
      >
        <div className="rounded-full bg-[--secondary-bg-color] group-hover:bg-[--primary-color] transition-all">
          <img src={plus} alt="add" className="size-20 rounded-full p-2 invert dark:invert-0" />
        </div>
        <p className="text-[--par-color]">Add a new link 🌟</p>
      </motion.div>

      {createPortal(
        <LinkCardForm close={() => setToggle(false)} toggle={toggle} setLinks={setLinks} />,
        document.getElementById('pop-up')!
      )}
    </>
  )
}
export default AddLinkCard
