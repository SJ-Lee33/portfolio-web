import { defineType, defineField, defineArrayMember } from 'sanity'
import { skills } from '../const/skills'
import { apiVersion } from '../../env'

const serialField = defineField({
  name: 'serial',
  title: 'Serial Number',
  description: '문서 번호 - 자동발급',
  type: 'number',
  readOnly: ({ document }) => Boolean(document?.serial),
  validation: (Rule) =>
    Rule.custom(async (val, ctx) => {
      // 발급 전에는 통과
      if (val === undefined || val === null) return true

      // 정수 & 범위
      if (!Number.isInteger(val)) return '정수만 입력됩니다.'
      if (val < 1 || val > 999_999) return '1 이상 999999 이하만 허용됩니다.'

      // 중복 검사(숫자/문자열 모두 비교해서 복제본/옛 데이터까지 커버)
      const client = ctx.getClient({ apiVersion: apiVersion })
      const draftId = `drafts.${ctx.document?._id}`
      const pubId = ctx.document?._id
      const sNum = val
      const sStr = String(val)

      const dup = await client.fetch(
        `
        count(*[
          _type == "study" &&
          defined(serial) &&
          (
            serial == $sNum ||
            string(serial) == $sStr
          ) &&
          !(_id in [$draftId, $pubId])
        ])
        `,
        { sNum, sStr, draftId, pubId },
      )

      return dup === 0 || '이미 사용 중인 번호입니다.'
    }).warning('번호는 자동 발급되며, 발행 시 최종 검증됩니다.'),
})

const titleField = defineField({
  title: '포스팅 제목',
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required(),
})

const categoryField = defineField({
  title: '카테고리',
  name: 'studyCategory',
  type: 'reference',
  to: [{ type: 'studyCategory' }],
  validation: (Rule) => Rule.required(),
})

const skillField = defineField({
  title: '기술 스택',
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

const bodyField = defineField({
  title: '본문',
  name: 'body',
  description:
    '학습 목표 - 성과(습득지식/기술) - 과정 - 인사이트 - 심화학습계획',
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
    defineArrayMember({ type: 'math' }), // ← 수식 블록 추가
  ],
})

export default defineType({
  title: '학습 포스팅 (개별 포스팅)',
  name: 'study',
  type: 'document',
  fields: [
    serialField,
    titleField,
    categoryField,

    skillField,
    thumbnailField,

    bodyField,
  ],
  orderings: [
    {
      title: 'Published, New → Old',
      name: 'publishedDesc',
      by: [{ field: '_publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'studyCategory.title',
    },
  },
})
