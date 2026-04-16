import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resume',
  title: '이력서',
  type: 'document',
  fields: [
    defineField({
      name: 'file',
      title: 'PDF 파일',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
