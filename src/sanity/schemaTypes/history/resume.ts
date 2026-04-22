import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resume',
  title: '경력기술서',
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
  preview: {
    select: {
      title: 'file.asset.originalFilename',
      updatedAt: '_updatedAt',
    },
    prepare(selection) {
      const { title, updatedAt } = selection

      return {
        title: title || '파일 없음',
        subtitle: updatedAt
          ? `수정일: ${new Date(updatedAt).toLocaleString()}`
          : '수정일 정보 없음',
      }
    },
  },
})
