'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="gap-3 items-center hidden md:flex">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </nav>

      <div onClick={() => setOpen((prev) => !prev)} className="md:hidden">
        <div className={`hamburger hamburger--slider ${open && 'active'}`}>
          <div className="hamburger-box">
            <div className="hamburger-inner bg-black before:bg-inherit after:bg-inherit"></div>
          </div>
        </div>
      </div>
      {open && (
        <nav className="absolute bg-blue-950/95 text-white left-0 top-[60px] w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-6 text-xl z-20 md:hidden">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
        </nav>
      )}
    </>
  )
}
