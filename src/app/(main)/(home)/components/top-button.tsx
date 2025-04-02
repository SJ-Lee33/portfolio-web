'use client'

import { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

export const TopButton = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return showButton ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-soft text-primary shadow-lg hover:bg-primaryDark hover:text-soft transition"
    >
      <FaArrowUp/>
    </button>
  ) : null
}
