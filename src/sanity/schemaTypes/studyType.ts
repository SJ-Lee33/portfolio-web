// src/sanity/schemaTypes/studyType.ts
import { defineType, defineField } from 'sanity'

export const studyType = defineType({
  name: 'study',
  title: 'Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'serial',
      title: 'Serial Number',
      type: 'number',
      readOnly: ({ document }) => Boolean(document?.serial),
      validation: (R) => R.integer().min(1).max(999_999),
    }),
    defineField({ name: 'skill', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt' }],
      validation: (R) => R.required(),
    }),
    // ⬇️ 반드시 blockContent 라는 이름과 일치해야 함
    defineField({ name: 'learningGoal', type: 'blockContent' }),
    defineField({ name: 'learningOutcome', type: 'blockContent' }),
    defineField({ name: 'learningProcess', type: 'blockContent' }),
    defineField({ name: 'learningInsight', type: 'blockContent' }),
    defineField({ name: 'learningPlan', type: 'blockContent' }),
  ],
})
