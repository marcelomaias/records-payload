import type { HeadingBlock as HeadingBlockProps } from 'src/payload-types'

import { cn } from 'src/utilities/cn'
import React from 'react'

type Props = {
  className?: string
} & HeadingBlockProps

export const HeadingBlock: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <div className={cn('container')}>
      <div className="uppercase text-xs tracking-wider">{subtitle}</div>
      <h2>{title}</h2>
    </div>
  )
}
