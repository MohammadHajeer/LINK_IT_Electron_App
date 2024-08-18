/* eslint-disable prettier/prettier */

import { WidgetProps } from '@renderer/types'
import { Reorder, useDragControls } from 'framer-motion'
import { ReorderIcon } from './ReorderIcon'
import Seperator from './Seperator'

const Widget = ({
  item,
  isDragging,
  setIsDragging
}: {
  item: WidgetProps
  isDragging: number | null
  setIsDragging: React.Dispatch<React.SetStateAction<number | null>>
}): JSX.Element => {
  const controls = useDragControls()
  return (
    <Reorder.Item
      onDrag={() => {
        setIsDragging(item.item)
      }}
      onDragEnd={() => {
        setIsDragging(null)
      }}
      className={`${isDragging == item.item ? 'shadow-lg z-[100]' : isDragging != null ? 'opacity-10' : ''} rounded-lg p-2 pb-0 bg-[--main-bg-color]`}
      value={item}
      dragControls={controls}
      dragListener={false}
    >
      {
        <div>
          <div className="flex items-start gap-5">
            <ReorderIcon dragControls={controls} />
            <item.widget />
          </div>
          <Seperator />
        </div>
      }
    </Reorder.Item>
  )
}

export default Widget
