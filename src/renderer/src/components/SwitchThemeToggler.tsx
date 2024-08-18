/* eslint-disable prettier/prettier */
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'

type Props = {
  mode: 'dark' | 'light'
  setMode: (mode: 'dark' | 'light') => void
}

const SwitchThemeToggler = ({ mode, setMode }: Props): JSX.Element => {
  return (
    <div
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      className="bg-[--primary-color] w-14 h-6 rounded-full relative cursor-pointer"
    >
      <span
        className={`absolute top-1/2 shadow-[--secondary-bg-color] shadow-inner -translate-y-1/2 size-7 bg-[--main-bg-color] rounded-full p-1 ${mode === 'dark' ? 'left-7 rotate-[360deg]' : 'left-0'} toggler`}
      >
        <img src={mode === 'light' ? sun : moon} className={`size-full`} alt="theme" />
      </span>
    </div>
  )
}

export default SwitchThemeToggler
