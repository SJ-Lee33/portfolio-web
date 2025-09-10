import {defineType, defineField} from 'sanity'
import {skills} from '../const/skills'

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
  of: [{type: 'string'}],
  options: {
    list: [...skills.map((skill) => ({title: skill, value: skill}))],
  },
  validation: (Rule) => Rule.required(),
})

const thumbnailField = defineField({
  title: '썸네일',
  name: 'thumbnail',
  type: 'image',
  validation: (Rule) => Rule.required(),
})

const roleField = defineField({
  title: '나의 역할',
  name: 'role',
  description: '예) 엔지니어 (개인 프로젝트), 디자이너 (팀 프로젝트)',
  type: 'string',
  validation: (Rule) => Rule.required(),
})

const contributionField = defineField({
  title: '핵심 기여',
  name: 'contribution',
  description: '핵심 기여 내용을 쉼표로 구분',
  type: 'text',
  validation: (Rule) => Rule.required(),
})

const startDateField = defineField({
  title: '프로젝트 시작일',
  name: 'startDate',
  type: 'date',
  options: {
    dateFormat: 'YYYY-MM',
  },
})

const releaseDateField = defineField({
  title: '프로젝트 출시일',
  name: 'releaseDate',
  type: 'date',
  options: {
    dateFormat: 'YYYY-MM',
  },
})

const summaryField = defineField({
  title: '프로젝트 요약',
  name: 'summary',
  type: 'text',
  description: '리스트에 표시될 요약 설명, 어미 없어도 됨.',
})

const contentOverviewField = defineField({
  title: '프로젝트 개요',
  name: 'contentOverview',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
    },
    {
      type: 'code',
    },
  ],
})

const contentContributionField = defineField({
  title: '프로젝트 기여',
  name: 'contentContribution',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
    },
    {
      type: 'code',
    },
  ],
})

const contentSkillField = defineField({
  title: '사용 기술',
  name: 'contentSkill',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
    },
    {
      type: 'code',
    },
  ],
})

const contentReflectionField = defineField({
  title: '느낀점 및 재고',
  name: 'contentReflection',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
    },
    {
      type: 'code',
    },
  ],
})

const troubleShootingsField = defineField({
  title: '트러블 슈팅',
  name: 'troubleShootings',
  description: '문제와 솔루션을 기입하는 란',
  type: 'array',
  of: [
    {
      title: '문제와 솔루션',
      name: 'troubleShooting',
      type: 'document',

      fields: [
        {
          title: '구분',
          name: 'troubleShootingType',
          type: 'number',
          options: {
            list: [
              {title: '문제', value: 0},
              {title: '해결', value: 1},
            ],
          },
        },
        {
          title: '제목',
          name: 'troubleShootingTitle',
          type: 'string',
        },
        {
          title: '내용',
          name: 'troubleShootingContent',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            {
              type: 'image',
            },
            {
              type: 'code',
            },
          ],
        },
      ],

      preview: {
        select: {
          type: 'troubleShootingType',
          title: 'troubleShootingTitle',
        },
        prepare(selection) {
          let {type, title} = selection
          type = type === 0 ? '문제' : '해결'
          return {
            title: `${type} : ${title}`,
          }
        },
      },
    },
  ],
})

const imagesField = defineField({
  title: '추가 이미지들',
  name: 'images',
  type: 'array',
  of: [{type: 'image'}],
})

const relatedProjectsField = defineField({
  title: '관련 프로젝트',
  description: '관련 있는 프로젝트 리스트',
  name: 'relatedProjects',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          title: '관련 프로젝트',
          name: 'reference',
          type: 'reference',
          to: [{type: 'project'}],
          options: {
            disableNew: true, // 새로운 문서 생성을 비활성화
          },
        },
      ],
      preview: {
        select: {
          title: 'reference.title',
        },
        prepare(selection) {
          const {title} = selection
          return {
            title: title || '제목 없음', // 제목이 없을 경우 '제목 없음'으로 표시
          }
        },
      },
    },
  ],
})

export default defineType({
  title: '프로젝트',
  name: 'project',
  type: 'document',
  fields: [
    typeField,
    titleField,

    skillField,
    thumbnailField,
    roleField,
    contributionField,
    startDateField,
    releaseDateField,

    summaryField,

    contentOverviewField,
    contentContributionField,
    contentSkillField,
    contentReflectionField,
    troubleShootingsField,

    imagesField,
    relatedProjectsField,
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
