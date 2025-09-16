import { defineType, defineField } from 'sanity'
import { skills } from '../const/skills'

const typeField = defineField({
  title: '분류',
  name: 'projectTypes',
  type: 'object',
  fields: [
    {
      title: '개발',
      name: 'development',
      initialValue: false,
      type: 'boolean',
    },
    {
      title: '마케팅',
      name: 'marketing',
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

const startDateField = defineField({
  title: '공부 시작일',
  name: 'startDate',
  type: 'date',
  options: {
    dateFormat: 'YYYY-MM',
    // calendarTodayLabel: 'Today',
  },
})

const endDateField = defineField({
  title: '공부 마무리일',
  name: 'endDate',
  type: 'date',
  options: {
    dateFormat: 'YYYY-MM',
    // calendarTodayLabel: 'Today',
  },
})

const studyListField = defineField({
  title: '학습 기록',
  description: '공부 포스팅 리스트',
  name: 'relatedStudies',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          title: '학습 포스팅 목록',
          name: 'studyRecord',
          type: 'reference',
          to: [{ type: 'study' }],
          options: {
            disableNew: false, // 새로운 문서 생성 활성화
          },
        },
      ],
      preview: {
        select: {
          title: 'studyRecord.title',
        },
        prepare(selection) {
          const { title } = selection
          return {
            title: title || '제목 없음', // 제목이 없을 경우 '제목 없음'으로 표시
          }
        },
      },
    },
  ],
})

export default defineType({
  title: '학습 카테고리',
  name: 'studyCategory',
  type: 'document',
  fields: [
    typeField,
    titleField,

    skillField,
    thumbnailField,

    startDateField,
    endDateField,

    summaryField,
    studyListField,
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
