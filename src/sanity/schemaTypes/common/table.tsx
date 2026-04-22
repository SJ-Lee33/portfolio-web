import { defineType, defineField } from 'sanity'

const caption = defineField({ name: 'caption', title: '캡션', type: 'string' })

const headerMode = defineField({
  name: 'mode',
  title: '헤더 모드',
  type: 'string',
  initialValue: 'rowHeader',
  options: {
    layout: 'radio',
    list: [
      { title: '첫 행이 헤더', value: 'rowHeader' },
      { title: '첫 열이 헤더', value: 'colHeader' },
      { title: '둘 다 헤더', value: 'bothHeader' },
    ],
  },
  validation: (Rule) => Rule.required(),
})

const table = defineField({
  name: 'table',
  title: '표 데이터',
  type: 'table', // @sanity/table 플러그인 타입
  validation: (Rule) => Rule.required(),
})

export default defineType({
  name: 'featureTable',
  title: '표',
  type: 'object',
  fields: [caption, headerMode, table],
  preview: {
    select: { mode: 'mode', caption: 'caption' },
    prepare({ mode, caption }) {
      const label =
        mode === 'rowHeader'
          ? '첫 행 헤더'
          : mode === 'colHeader'
            ? '첫 열 헤더'
            : '둘 다 헤더'
      return {
        title: `표 — ${label}`,
        subtitle: caption || '',
      }
    },
  },
})
