/* eslint-disable prettier/prettier */

import { AnimatePresence, motion } from 'framer-motion'
import check from '../assets/check.svg'
import { SetThemeParams, ThemeParams } from '@renderer/types';

type Props = {
  theme: ThemeParams
  currentTheme: string
  setTheme: SetThemeParams
}

const ColorPicker = ({ theme, currentTheme, setTheme }: Props): JSX.Element => {
  return (
    <li
      className={`relative w-7 h-7 rounded-full cursor-pointer`}
      style={{ backgroundColor: theme.hex }}
      onClick={() => setTheme(theme.name)}
    >
      <AnimatePresence>
        {currentTheme === theme.name && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute w-full h-full top-0 left-0 rounded-full p-1.5 bg-[#eeeeee54]"
          >
            <img src={check} alt="check" className="size-full invert" />
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  )
}

export default ColorPicker
