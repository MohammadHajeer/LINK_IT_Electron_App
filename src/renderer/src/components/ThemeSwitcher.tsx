/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import SwitchThemeToggler from './SwitchThemeToggler'
import { motion } from 'framer-motion'

const ThemeSwitcher = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { mode, setMode } = useTheme()
  return (
    <div className="flex justify-between items-start relative w-full gap-4 flex-1 flex-wrap">
      <motion.div className="flex gap-4">
        {children}
        <motion.h3 layout className="font-semibold text-xl text-[--text-color] leading-none">
          Mode
        </motion.h3>
      </motion.div>
      <SwitchThemeToggler setMode={setMode} mode={mode} />
    </div>
  )
}

export default ThemeSwitcher
