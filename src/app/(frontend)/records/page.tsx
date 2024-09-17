import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 60

const RecordsPage = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  const recordsList = await payload.find({
    collection: 'records',
    depth: 1,
    limit: 12,
    draft: false,
  })

  const records = recordsList.docs

  return (
    <main className="pt-20 container">
      <h1>Records Page</h1>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 my-6 md:my-12">
        {records?.map((record, index) => {
          if (typeof record === 'object' && record !== null) {
            return (
              <Link href={`/records/${record.slug || ''}`} className="col-span-2" key={index}>
                <Image
                  alt={typeof record.cover === 'string' ? '' : record.cover.alt || ''}
                  src={typeof record.cover === 'string' ? '' : record.cover.url || ''}
                  width={1080}
                  height={1080}
                  className="shadow-md"
                />
                <div className="text-xs pt-1">{record.title}</div>
              </Link>
            )
          }

          return null
        })}
      </div>
    </main>
  )
}

export default RecordsPage

export function generateMetadata(): Metadata {
  return {
    title: `Records - Area Records`,
    description: 'The records list on Area Records website.',
    openGraph: {
      title: `Records - Area Records`,
    },
    twitter: {
      title: `Records - Area Records`,
    },
  }
}
