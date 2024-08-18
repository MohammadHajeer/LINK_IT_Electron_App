/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { note } from '@renderer/assets'
import { createPortal } from 'react-dom'
import Alert from './Alert'
import { AnimatePresence, motion } from 'framer-motion'

const HelpButton = (): JSX.Element => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <AnimatePresence>
        {!toggle && (
          <motion.button
            exit={{ y: [0, -20, 100] }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: [100, -20, 0] }}
            onClick={() => setToggle(true)}
            className="bg-[--primary-color] p-2 rounded-lg size-11 absolute bottom-5 left-5 cursor-pointer shadow-2xl"
            style={{
              boxShadow: '0px 5px 0 var(--secondary-bg-color), 0 8px 0 var(--primary-color)'
            }}
          >
            <img src={note} alt="question" className="size-full invert dark:invert-0" />
          </motion.button>
        )}
      </AnimatePresence>
      {createPortal(
        <Alert close={() => setToggle(false)} toggle={toggle} />,
        document.getElementById('pop-up')!
      )}
    </>
  )
}

export default HelpButton
