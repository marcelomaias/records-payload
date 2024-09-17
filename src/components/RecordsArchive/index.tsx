import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Record } from '@/payload-types'

import { RecordCard } from '@/components/RecordCard'

export type Props = {
  records: Record[]
}

export const RecordsArchive: React.FC<Props> = (props) => {
  const { records } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {records?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-3" key={index}>
                  <RecordCard className="h-full" doc={result} relationTo="records" />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
