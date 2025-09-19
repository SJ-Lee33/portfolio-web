import { defineType, defineField } from 'sanity'

// 수학식
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
      options: { list: ['inline', 'block'] },
      initialValue: 'inline',
    }),
  ],
})
