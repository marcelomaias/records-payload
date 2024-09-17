import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Record } from '@/payload-types'

export const revalidateRecord: CollectionAfterChangeHook<Record> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/records/${doc.slug}`

    payload.logger.info(`Revalidating record at path: ${path}`)

    revalidatePath(path)
  }

  // If the record was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    payload.logger.info(`Revalidating old record at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
