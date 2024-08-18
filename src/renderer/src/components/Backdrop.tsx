/* eslint-disable prettier/prettier */

import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  toggle: boolean
  close: () => void
  children: React.ReactNode
}

const Backdrop = ({ toggle, children, close }: Props): JSX.Element => {
  return (
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed w-full bottom-0 left-0 bg-[--backdrop-color] backdrop-blur-s flex justify-center items-center"
          style={{ height: 'calc(100vh - 40px)' }}
          onClick={close}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Backdrop
