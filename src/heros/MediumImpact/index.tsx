import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative h-[100vh] bg-black hero">
      {media && typeof media === 'object' && (
        <div className="absolute top-0 left-0 w-full z-0 opacity-25">
          <Media
            className="h-[100vh]"
            imgClassName="h-[100vh] object-cover"
            priority
            resource={media}
          />
          {media?.caption && (
            <div className="mt-3">
              <RichText content={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
      <div className="text-white relative z-10 flex flex-col h-[100vh] justify-end pb-6 ml-6 md:pb-20 md:pl-20 max-w-[60%]">
        {richText && (
          <RichText className="" content={richText} enableGutter={false} enableProse={false} />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4 mt-6">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
