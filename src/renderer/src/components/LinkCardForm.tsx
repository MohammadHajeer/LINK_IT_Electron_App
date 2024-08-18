/* eslint-disable prettier/prettier */

import Backdrop from './Backdrop'
import link from '../assets/link.svg'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  toggle: boolean
  close: () => void
  setLinks: React.Dispatch<
    React.SetStateAction<
      {
        url: string
        name: string
      }[]
    >
  >
}

const LinkCardForm = ({ toggle, close, setLinks }: Props): JSX.Element => {
  const [inputs, setInputs] = useState({
    url: '',
    name: ''
  })
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.placeholder]: e.target.value }))
  }
  const handleForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (status) {
      setLinks((prev) => {
        localStorage.setItem('links', JSON.stringify([...prev, inputs]))
        return [...prev, inputs]
      })

      close()
    }
  }
  const verifyLink = (): void => {
    fetch(`https://logo.clearbit.com/${inputs.url}`)
      .then((response) => {
        if (response.ok) {
          setStatus(true)
        } else if (response.status === 404) {
          console.log('Logo not found: Invalid URL')
          setStatus(false)
        } else {
          console.log('Failed to fetch logo: Status', response.status)
          setStatus(false)
        }
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          console.log('Fetch failed due to network issues or CORS.')
        } else {
          console.log('Unexpected error:', error)
        }
        setStatus(false)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    return (): void => {
      setInputs({ url: '', name: '' })
    }
  }, [toggle])

  return (
    <Backdrop toggle={toggle} close={close}>
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[400px] flex flex-col gap-3 px-5 py-7 rounded-lg bg-[--main-bg-color] shadow-lg"
      >
        {loading && <p className="text-[--par-color]">Loading...</p>}
        <form
          onSubmit={(e) => {
            handleForm(e)
            setLoading(true)
          }}
          className="flex flex-col gap-4 z-20"
        >
          <input
            onChange={handleInput}
            placeholder="url"
            type="text"
            className="outline-none p-3 rounded-lg bg-[--secondary-bg-color] text-[--text-color]"
          />
          <input
            onChange={handleInput}
            placeholder="name"
            type="text"
            className="outline-none p-3 rounded-lg bg-[--secondary-bg-color] text-[--text-color]"
          />
          <button
            className="bg-[--primary-color] rounded-lg py-2 px-5 text-white font-semibold
           flex justify-around gap-5 items-center hover:opacity-80 transition-all"
          >
            <img src={link} alt="url icon" className="size-5 animate-ping invert" />
            Add
            <img src={link} alt="url icon" className="size-5 animate-ping invert" />
          </button>
        </form>
      </motion.div>
    </Backdrop>
  )
}

export default LinkCardForm
