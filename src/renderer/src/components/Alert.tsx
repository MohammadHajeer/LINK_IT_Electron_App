/* eslint-disable prettier/prettier */
import Backdrop from './Backdrop'

type Props = {
  close: () => void
  toggle: boolean
}

const Alert = ({ close, toggle }: Props): JSX.Element => {
  return (
    <Backdrop close={close} toggle={toggle}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[--main-bg-color] w-[600px] py-5 px-7 rounded-xl shadow-lg flex flex-col"
      >
        <p className="text-[--text-color]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In suscipit saepe omnis voluptas
          facilis, perferendis nemo nobis velit quisquam quaerat?
        </p>
        <button
          onClick={close}
          className="bg-[--primary-color] py-1 px-5 rounded-lg text-lg text-white mt-5 ml-auto"
        >
          Okay
        </button>
      </div>
    </Backdrop>
  )
}

export default Alert
