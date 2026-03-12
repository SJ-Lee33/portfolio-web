import { defineType, defineField } from 'sanity'
import { skills } from '../const/skills'

const typeField = defineField({
  title: '분류',
  name: 'studyTypes',
  type: 'object',
  fields: [
    {
      title: '개발',
      name: 'engineering',
      initialValue: false,
      type: 'boolean',
    },
    {
      title: '마케팅',
      name: 'planning',
      initialValue: false,
      type: 'boolean',
    },
    {
      title: '디자인',
      name: 'design',
      initialValue: false,
      type: 'boolean',
    },
  ],
})

const titleField = defineField({
  title: '프로젝트 제목',
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required(),
})

const skillField = defineField({
  title: '기술스택',
  name: 'skill',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [...skills.map((skill) => ({ title: skill, value: skill }))],
  },
  validation: (Rule) => Rule.required(),
})

const thumbnailField = defineField({
  title: '썸네일',
  name: 'thumbnail',
  type: 'image',
  validation: (Rule) => Rule.required(),
})

const summaryField = defineField({
  title: '스터디 내용 요약',
  name: 'summary',
  description: '스터디/학습 프로젝트 내용 요약',
  type: 'text',
  validation: (Rule) => Rule.required(),
})

const slugField = defineField({
  title: 'slug로 사용할 이름(영문)',
  name: 'slug',
  type: 'string',
  validation: (Rule) =>
    Rule.required()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        name: 'kebab-case',
        invert: false,
      })
      .error('영문 소문자/숫자/하이픈만 사용, 앞뒤 하이픈 금지'),
})

export default defineType({
  title: '학습 카테고리',
  name: 'studyCategory',
  type: 'document',
  fields: [
    typeField,
    titleField,
    slugField,

    skillField,
    thumbnailField,

    summaryField,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug',
    },
  },
})
