/* eslint-disable prettier/prettier */
import { useTheme } from '@renderer/ThemeProvider/Theme'
import link from '../assets/link.svg'
import HelpButton from './HelpButton'
import Themes from './Themes'
import Seperator from './Seperator'
import ThemeSwitcher from './ThemeSwitcher'
import { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'
import { WidgetProps } from '@renderer/types'
import Widget from './Widget'

const intialWidgets: WidgetProps[] = [
  {
    item: 0,
    widget: ThemeSwitcher
  },
  {
    item: 1,
    widget: Themes
  }
]

const SideBar = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const [widgets, setWidgets] = useState(() => {
    const localData = window.localStorage.getItem('widgets')
    return localData
      ? JSON.parse(localData).map(({ item }: { item: number }) => {
          const widget = intialWidgets.find((w) => w.item === item)
          return widget
        })
      : intialWidgets
  })
  const { mode } = useTheme()

  useEffect(() => {
    window.localStorage.setItem('widgets', JSON.stringify(widgets))
  }, [widgets])

  return (
    <div className={`sticky h-full rounded-r-xl w-[300px] p-5`}>
      <div className="pb-10">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-[--primary-color]">LINK IT</h1>
          <p className="text-xl text-[--par-color] tracking-widest uppercase">keep it halal</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={link} alt="link" className={`size-5 ${mode === 'dark' ? 'invert' : ''}`} />
          <Seperator />
          <img src={link} alt="link" className={`size-5 ${mode === 'dark' ? 'invert' : ''}`} />
        </div>
      </div>
      <Reorder.Group axis="y" values={widgets} onReorder={setWidgets}>
        {widgets.map((item: WidgetProps) => (
          <Widget
            key={item.item}
            item={item}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        ))}
      </Reorder.Group>
      <HelpButton />
    </div>
  )
}

export default SideBar
