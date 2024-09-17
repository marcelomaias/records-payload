import type { Block } from 'payload'

export const RecordList: Block = {
  slug: 'recordList',
  interfaceName: 'RecordListBlock',
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
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'records',
      label: 'Collections To Show',
      options: [
        {
          label: 'Records',
          value: 'records',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['records'],
    },
  ],
  labels: {
    plural: 'RecordLists',
    singular: 'RecordList',
  },
}
