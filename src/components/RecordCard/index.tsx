'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Record } from '@/payload-types'

import { Media } from '@/components/Media'
import RecordIcon from '../RecordIcon'

export const RecordCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Record
  relationTo?: 'records'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('rounded-lg overflow-hidden hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <RecordIcon />}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
      </div>
      {titleToUse && (
        <Link className="text-xs" href={href} ref={link.ref}>
          {titleToUse}
        </Link>
      )}
    </article>
  )
}
