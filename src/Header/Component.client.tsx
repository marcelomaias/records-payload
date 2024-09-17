'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  const { alt, url, width, height }: any = header.logo

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <motion.div
      style={{ zIndex: 20, position: 'fixed', top: 0 }}
      variants={{
        isScrolled: {
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
        },
        notScrolled: {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        },
      }}
      animate={scrolled ? 'isScrolled' : 'notScrolled'}
    >
      <header className="w-[100vw] bg-white" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="container h-[60px] flex justify-between items-center">
          <Link href="/" className="logo max-w-44">
            <NextImage alt={alt} height={height} src={url} width={width} />
          </Link>
          <HeaderNav header={header} />
        </div>
      </header>
    </motion.div>
  )
}
