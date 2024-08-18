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
        <div className="text-[--text-color]">
          <h2 className="text-3xl text-[--primary-color]">Welcome to Link It!</h2>{' '}
          <p className="my-4">
            Thank you for using Link It. As you bookmark and organize your favorite links, please
            remember to:
          </p>
          <ul>
            <li>
              <span className="text-[--par-color]">Use Responsibly:</span> Ensure that the links you
              save comply with legal and ethical standards.
            </li>
            <li>
              <span className="text-[--par-color]">Respect Privacy:</span> Avoid bookmarking
              sensitive or personal information without permission.
            </li>
            <li>
              <span className="text-[--par-color]">Follow Best Practices:</span> Organize your
              bookmarks in a way that respects intellectual property and content guidelines.
            </li>
            <li>
              <span className="text-[--par-color]">Keep It Halal:</span> Ensure that the content and
              links you bookmark adhere to halal practices and ethical guidelines.
            </li>
          </ul>
        </div>
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
