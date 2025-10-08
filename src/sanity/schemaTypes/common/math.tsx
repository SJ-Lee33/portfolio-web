import React from 'react'
import { defineType, defineField } from 'sanity'
import MathInput from './MathInput'
import MathPreview from './MathPreview'

export default defineType({
  name: 'math',
  title: 'Math (TeX)',
  type: 'object',
  fields: [
    defineField({ name: 'tex', title: 'TeX', type: 'text' }),
    defineField({
      name: 'display',
      title: 'Display',
      type: 'string',
      initialValue: 'inline',
      options: {
        list: [
          { title: 'Inline', value: 'inline' },
          { title: 'Block', value: 'block' },
        ],
        layout: 'radio',
      },
    }),
  ],
  components: { input: MathInput },

  preview: {
    select: { tex: 'tex', display: 'display' },
    prepare({ tex, display }: { tex?: string; display?: 'inline' | 'block' }) {
      return {
        title: (tex ?? '').slice(0, 60) || '(empty)',
        subtitle: display === 'block' ? 'Block' : 'Inline',
        media: () => <MathPreview tex={tex} display={display} />,
      }
    },
  },
})
