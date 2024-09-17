import type { Block } from 'payload'

export const Heading: Block = {
  slug: 'heading',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
      ],
    },
  ],
  interfaceName: 'HeadingBlock',
}
