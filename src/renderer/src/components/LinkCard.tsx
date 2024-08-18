/* eslint-disable prettier/prettier */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  url: string
  name: string
}

const LinkCard = ({ url, name }: Props): JSX.Element => {
  const [logo, setLogo] = useState<string | null>(null)
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
      getLogo()
    }

    const handleOnline = (): void => {
      getLogo()
    }
    window.addEventListener('online', handleOnline)

    return (): void => {
      window.removeEventListener('online', handleOnline)
    }
  }, [])
  return (
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
      className="flex flex-col gap-2 items-center rounded-lg p-5 bg-[--main-bg-color] overflow-hidden shadow-xl group relative"
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
            <Option />
            <Option />
            <Option />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default LinkCard

const Option = (): JSX.Element => {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      onHoverStart={() => {
        setHover(true)
      }}
      onHoverEnd={() => {
        setHover(false)
      }}
      variants={childVariants}
      className="size-10 bg-[--primary-color] rounded-full hover:bg-red-50 cursor-pointer z-10"
    ></motion.div>
  )
}

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
  hidden: { opacity: 0, y: 300, scale: 0 }, // Initial state
  show: { opacity: [1, 0.7, 1, 0.7, 1], y: 0, scale: [1, 0.8, 1.3, 0.8, 1] } // Final state
}
