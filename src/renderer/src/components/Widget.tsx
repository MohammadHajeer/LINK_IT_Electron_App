/* eslint-disable prettier/prettier */

import { WidgetProps } from '@renderer/types'
import { motion, Reorder, useDragControls } from 'framer-motion'
import { ReorderIcon } from './ReorderIcon'
import Seperator from './Seperator'

type Props = {
  item: WidgetProps
  reordering: boolean
  isDragging: number | null
  setIsDragging: React.Dispatch<React.SetStateAction<number | null>>
}

const Widget = ({ item, isDragging, setIsDragging, reordering }: Props): JSX.Element => {
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
            <item.widget>
              {reordering && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ transition: { delay: 0.1 }, opacity: 1 }}
                >
                  <ReorderIcon dragControls={controls} />
                </motion.span>
              )}
            </item.widget>
          </div>
          <Seperator />
        </div>
      }
    </Reorder.Item>
  )
}

export default Widget
