/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import ColorPicker from './ColorPicker'
import { motion } from 'framer-motion'

const Themes = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { availableThemes, currentTheme, setTheme } = useTheme()
  return (
    <div className="flex gap-4">
      {children}
      <motion.div layout className="flex flex-col gap-2 flex-none w-auto">
        <h3 className="font-semibold text-xl text-[--text-color] leading-none">Themes</h3>
        <ul className="flex gap-2">
          {availableThemes.map((theme, index) => (
            <ColorPicker
              key={index}
              currentTheme={currentTheme}
              theme={theme}
              setTheme={setTheme}
            />
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default Themes
