/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import ColorPicker from './ColorPicker'

const Themes = (): JSX.Element => {
  const { availableThemes, currentTheme, setTheme } = useTheme()
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold text-xl text-[--text-color] leading-none">Themes</h3>
      <ul className="flex gap-2">
        {availableThemes.map((theme, index) => (
          <ColorPicker key={index} currentTheme={currentTheme} theme={theme} setTheme={setTheme} />
        ))}
      </ul>
    </div>
  )
}

export default Themes
