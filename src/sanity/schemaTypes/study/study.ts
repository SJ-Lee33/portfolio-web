import { defineType, defineField } from 'sanity'
import { skills } from '../const/skills'
import { apiVersion } from '@/sanity/env'

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

const learningGoalField = defineField({
  title: '학습 목표',
  name: 'learningGoal',
  description: '이번 포스팅에서 다루는 내용의 서론',
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

const learningOutcomeField = defineField({
  title: '학습 성과',
  name: 'learningOutcome',
  description: '습득한 지식/기술, 결론만 적기',
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

const learningProcessField = defineField({
  title: '학습 과정',
  name: 'learningProcess',
  description: '무엇을 어떻게 배웠는지 설명 적기',
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

const learningInsightField = defineField({
  title: '아쉬움과 인사이트',
  name: 'learningInsight',
  description: '아려웠던 점, 부족했던 점, 교훈, 인사이트',
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

const learningPlanField = defineField({
  title: '앞으로의 계획',
  name: 'learningPlan',
  description: '더 심화된 액션 플랜이 있다면 적기',
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

export default defineType({
  title: '학습 포스팅 (개별 포스팅)',
  name: 'study',
  type: 'document',
  fields: [
    serialField,
    titleField,

    skillField,
    thumbnailField,

    learningGoalField,
    learningOutcomeField,
    learningProcessField,
    learningInsightField,
    learningPlanField,
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
