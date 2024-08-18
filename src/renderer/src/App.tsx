import MenuBar from './components/MenuBar'
import arrow from './assets/arrow.svg'
import { useState } from 'react'
import SideBar from './components/SideBar'
import { motion, useAnimation } from 'framer-motion'
import { useTheme } from './ThemeProvider/Theme'
import AddLinkCard from './components/AddLinkCard'
import LinkCard from './components/LinkCard'
// https://logo.clearbit.com/
const App = (): JSX.Element => {
  const [toggle, setToggle] = useState(() => {
    const localData = window.localStorage.getItem('toggle')
    return localData === 'true' || false
  })
  const [links, setLinks] = useState(() => {
    const localData = window.localStorage.getItem('links')
    return localData
      ? (JSON.parse(localData) as { url: string; name: string }[])
      : ([] as { url: string; name: string }[])
  })
  const { mode } = useTheme()
  const animate = useAnimation()
  let isOpen = toggle

  return (
    <>
      <MenuBar />
      <div
        className="flex transition-all relative mt-10 select-none"
        style={{ height: 'calc(100vh - 40px)' }}
      >
        <SideBar />
        <motion.div
          animate={animate}
          className={`bg-[--secondary-bg-color] flex-1 transition-all absolute w-full h-full top-0 right-0 ${toggle ? 'rounded-l-xl' : 'rounded-none'} py-7 px-10`}
          style={{ width: toggle ? 'calc(100% - 300px)' : '100%' }}
        >
          <button
            onClick={() => {
              isOpen = !isOpen
              animate.start({
                width: isOpen ? 'calc(100% - 300px)' : '100%'
              })
              setToggle(isOpen)
              window.localStorage.setItem('toggle', isOpen.toString())
            }}
            className="absolute top-1/2 left-1.5 -translate-y-1/2"
          >
            <img
              src={arrow}
              alt="arrow"
              className={`w-7 h-7 transition-all ${mode === 'dark' ? 'invert' : ''}`}
              style={{ transform: toggle ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
            />
          </button>
          <div
            className="rounded-xl  h-full gap-5"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              alignContent: 'start'
            }}
          >
            <AddLinkCard setLinks={setLinks} />
            {links.map((link, index) => (
              <LinkCard key={index} name={link.name} url={link.url} />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default App
