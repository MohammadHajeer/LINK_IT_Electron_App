/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import SwitchThemeToggler from './SwitchThemeToggler'

const ThemeSwitcher = (): JSX.Element => {
  const { mode, setMode, currentTheme } = useTheme()
  return (
    <div className="flex justify-between items-start relative w-full">
      <h3 className="font-semibold text-xl text-[--text-color] leading-none">Mode</h3>
      <SwitchThemeToggler currentTheme={currentTheme} setMode={setMode} mode={mode} />
    </div>
  )
}

export default ThemeSwitcher
