/* eslint-disable prettier/prettier */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { goToLink, edit, minus } from '../assets'
import { createPortal } from 'react-dom'
import LinkCardForm from './LinkCardForm'

type Props = {
  url: string
  name: string
  id: string
  setLinks: React.Dispatch<
    React.SetStateAction<
      {
        url: string
        name: string
        id: string
      }[]
    >
  >
}

const LinkCard = ({ url, name, setLinks, id }: Props): JSX.Element => {
  const [logo, setLogo] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [hover, setHover] = useState(false)

  const getLogo = (): void => {
    fetch(`https://logo.clearbit.com/${url}`)
      .then((response) => {
        if (response.ok) {
          setLogo(response.url)
        } else if (response.status === 404) {
          console.log('Logo not found: Invalid URL')
          setLogo(null)
        } else {
          console.log('Failed to fetch logo: Status', response.status)
          setLogo(null)
        }
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          console.log('Fetch failed due to network issues or CORS.')
        } else {
          console.log('Unexpected error:', error)
        }
        setLogo(null)
      })
  }

  useEffect(() => {
    if (url) {
      console.log(url)
      getLogo()
    }

    const handleOnline = (): void => {
      getLogo()
    }
    window.addEventListener('online', handleOnline)

    return (): void => {
      window.removeEventListener('online', handleOnline)
    }
  }, [url])
  return (
    <>
      <motion.div
        onHoverStart={() => {
          setHover(true)
        }}
        onHoverEnd={() => {
          setHover(false)
        }}
        style={{
          backgroundImage: ''
        }}
        layout
        className="flex flex-col gap-2 items-center rounded-lg p-5 bg-[--main-bg-color] overflow-hidden shadow-xl group relative size-[190px] flex-1 min-w-[190px] justify-center"
      >
        <div className="bg-[--par-color] p-1 rounded-full size-24">
          {logo ? (
            <img src={logo} alt="link" className="size-full rounded-full" />
          ) : (
            <div className="bg-[--secondary-bg-color] size-full rounded-full animate-pulse"></div>
          )}
        </div>
        {name ? (
          <p className="font-semibold text-[--text-color]">{name}</p>
        ) : (
          <div className="font-semibold bg-[--secondary-bg-color] animate-pulse h-4 w-full rounded-lg"></div>
        )}
        <AnimatePresence>
          {hover && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute bg-gradient-to-t from-[--backdrop-color] to-[--main-bg-color] inset-0 z-10
      flex justify-center items-center gap-5"
            >
              <motion.div
                onClick={() => {
                  window.open(`https://${url}`, '_blank')
                }}
                variants={childVariants}
                className="size-10 bg-[--main-bg-color] shadow-md rounded-full hover:bg-[--text-color] cursor-pointer z-10 p-2.5 transition-colors"
              >
                <img src={goToLink} alt="go to link" className="size-full" />
              </motion.div>
              <motion.div
                onClick={() => (setEditing(true), setHover(false))}
                variants={childVariants}
                className="size-10 bg-[--main-bg-color] shadow-md rounded-full hover:bg-[--text-color] cursor-pointer z-10 p-2.5 transition-colors"
              >
                <img src={edit} alt="edit" className="size-full" />
              </motion.div>
              <motion.div
                onClick={() => {
                  setLinks((prev) => {
                    const newLinks = prev.filter((link) => link.id !== id)
                    localStorage.setItem('links', JSON.stringify(newLinks))
                    return newLinks
                  })
                }}
                variants={childVariants}
                className="size-10 bg-[--main-bg-color] shadow-md rounded-full hover:bg-[--text-color] cursor-pointer z-10 p-2.5 transition-colors"
              >
                <img src={minus} alt="delete" className="size-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {createPortal(
        <LinkCardForm
          close={() => setEditing(false)}
          toggle={editing}
          setLinks={setLinks}
          type="edit"
          linkId={id}
        />,
        document.getElementById('pop-up')!
      )}
    </>
  )
}

export default LinkCard

const staggerContainer = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      type: 'tween'
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 300, scale: 0 },
  show: { opacity: [1, 0.7, 1, 0.7, 1], y: 0, scale: [1, 0.8, 1.3, 0.8, 1] }
}
