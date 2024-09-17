import type { Record, RecordListBlock as RecordListBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

import { RecordsArchive } from '@/components/RecordsArchive'

export const RecordListBlock: React.FC<
  RecordListBlockProps & {
    id?: string
  }
> = async (props) => {
  const { title, subtitle, id, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let records: Record[] = []

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const fetchedRecords = await payload.find({
      collection: 'records',
      depth: 1,
      limit,
    })

    records = fetchedRecords.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedRecords = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Record[]

      records = filteredSelectedRecords
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container mb-6">
        <div className="uppercase text-xs tracking-wider">{subtitle}</div>
        <h2>{title}</h2>
      </div>
      <RecordsArchive records={records} />
    </div>
  )
}
