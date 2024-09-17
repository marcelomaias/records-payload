import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import RichText from '@/components/RichText'
import NextImage from 'next/image'
import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const records = await payload.find({
    collection: 'records',
    limit: 1000,
  })

  return records.docs?.map(({ slug }) => slug)
}

export default async function SingleRecord({ params: { slug = '' } }) {
  const record = await queryRecordBySlug({ slug })

  return (
    <main className="py-20 container">
      <div className="sm:flex sm:gap-12 w-full">
        <div className="sm:w-1/3">
          <NextImage
            className="shadow-lg"
            alt={typeof record.cover === 'string' ? '' : record.cover.alt}
            height={1080}
            src={typeof record.cover === 'string' ? '' : record.cover.url || ''}
            width={1080}
          />
        </div>
        <div className="sm:w-2/3">
          <h1 className="inline tracking-tight">{record.title}</h1>{' '}
          <span className="font-light text-2xl md:text-4xl lg:text-6xl;">
            &nbsp;({record.year})
          </span>
          <div className="uppercase font-normal mt-4 mb-5 bg-black text-white px-2 py-0 rounded-lg text-right leading-5">
            {typeof record.artist === 'string' ? '' : record.artist?.name}
          </div>
          <RichText content={record.description} enableGutter={false} />
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const record = await queryRecordBySlug({ slug })

  return generateMeta({ doc: record })
}

const queryRecordBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'records',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
