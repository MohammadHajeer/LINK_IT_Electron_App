/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import link from '../assets/link.svg'

interface WindowAPI {
  minimize: () => void;
  close: () => void;
  maximize: () => void;
}

const MenuBar = (): JSX.Element => {
  const { mode } = useTheme()

  const handleExit = (): void => {
    (window.api as WindowAPI).close();
  }

  const handleMinimize = (): void => {
    (window.api as WindowAPI).minimize()
  }

  const handleMaximize = (): void => {
    (window.api as WindowAPI).maximize()
  }

  return (
    <div className="w-full top-0 left-0 h-10 bg-[--menu-bar-color] shadow-2xl fixed z-[10000] flex items-center justify-between draggable">
      <img src={link} className={`size-7 ml-5 ${mode === 'dark' && 'invert'}`} />
      <div className="flex no-drag">
        <button
          onClick={handleMinimize}
          className="size-10 relative hover:bg-[--primary-color] group transition-all flex items-center justify-center p-2.5"
        >
          <span className="bg-[--text-color] h-1 w-full rounded-full group-hover:bg-[--main-bg-color] transition-all"></span>
        </button>
        <button
          onClick={handleMaximize}
          className="size-10 relative hover:bg-[--primary-color] group transition-all flex items-center justify-center p-2.5"
        >
          <span className="h-full w-full rounded-md border-4 border-[--text-color] group-hover:border-[--main-bg-color] transition-all"></span>
        </button>
        <button
          onClick={handleExit}
          className="size-10 relative hover:bg-[--primary-color] group transition-all"
        >
          <span className="bg-[--text-color] h-3/5 w-1 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-45 group-hover:bg-[--main-bg-color] transition-all"></span>
          <span className="bg-[--text-color] h-3/5 w-1 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-45 group-hover:bg-[--main-bg-color] transition-all"></span>
        </button>
      </div>
    </div>
  )
}

export default MenuBar
