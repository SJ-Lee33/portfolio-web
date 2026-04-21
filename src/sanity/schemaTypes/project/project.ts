import { defineType, defineField, defineArrayMember } from 'sanity'
import { skills } from '../const/skills'
import { apiVersion } from '../../env'

// ─── 기존 필드 (변경 없음) ────────────────────────────────────────────────────

const serialField = defineField({
  name: 'serial',
  title: 'Serial Number',
  description: '문서 번호 - 번호는 자동 발급되며, 발행 시 최종 검증됩니다.',
  type: 'number',
  readOnly: ({ document }) => Boolean(document?.serial),
  validation: (Rule) =>
    Rule.custom(async (val, ctx) => {
      if (val === undefined || val === null) return true
      if (!Number.isInteger(val)) return '정수만 입력됩니다.'
      if (val < 1 || val > 999_999) return '1 이상 999999 이하만 허용됩니다.'
      const client = ctx.getClient({ apiVersion: apiVersion })
      const draftId = `drafts.${ctx.document?._id}`
      const pubId = ctx.document?._id
      const sNum = val
      const sStr = String(val)
      const dup = await client.fetch(
        `count(*[_type == "project" && defined(serial) && (serial == $sNum || string(serial) == $sStr) && !(_id in [$draftId, $pubId])])`,
        { sNum, sStr, draftId, pubId },
      )
      return dup === 0 || '이미 사용 중인 번호입니다.'
    }),
})

const isPublicField = defineField({
  title: '공개 여부',
  name: 'isPublic',
  type: 'boolean',
  initialValue: true,
  description: '비활성화 시, 웹사이트에는 표시되지 않음',
  options: { layout: 'switch' },
})

const typeField = defineField({
  title: '분류',
  name: 'projectTypes',
  type: 'object',
  fields: [
    {
      title: '개발',
      name: 'engineering',
      initialValue: false,
      type: 'boolean',
    },
    { title: '기획', name: 'planning', initialValue: false, type: 'boolean' },
    { title: '디자인', name: 'design', initialValue: false, type: 'boolean' },
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

const startDateField = defineField({
  title: '프로젝트 시작일',
  name: 'startDate',
  type: 'date',
  options: { dateFormat: 'YYYY-MM' },
})

const releaseDateField = defineField({
  title: '프로젝트 출시일',
  name: 'releaseDate',
  type: 'date',
  options: { dateFormat: 'YYYY-MM' },
})

const summaryField = defineField({
  title: '프로젝트 요약',
  name: 'summary',
  type: 'text',
  description:
    '리스트 카드 및 Hero 섹션 부제목에 표시됩니다. 한두 줄 이내로 핵심을 압축하세요. (예) Unity 3D와 WebGL로 만든 FPS 퀴즈 게임. 설치 없이 브라우저에서 즉시 플레이 가능.',
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
          to: [{ type: 'project' }],
          options: { disableNew: true },
        },
      ],
      preview: {
        select: { title: 'reference.title' },
        prepare(selection) {
          const { title } = selection
          return { title: title || '제목 없음' }
        },
      },
    },
  ],
})

// ─── Hero 영역 필드 ───────────────────────────────────────────────

const thumbnailField = defineField({
  title: '썸네일 이미지',
  name: 'thumbnail',
  type: 'image',
  description:
    'Hero 섹션 좌측에 세로형(3:4 비율 권장)으로 표시됩니다. 프로젝트를 대표하는 이미지를 업로드하세요.',
  options: { hotspot: true },
  validation: (Rule) => Rule.required(),
})

const roleField = defineField({
  title: '나의 역할',
  name: 'role',
  type: 'string',
  description:
    'Hero 섹션 역할 뱃지로 표시됩니다. 쉼표로 구분해 여러 역할을 입력하세요. (예) Unity 게임 개발, 배포 구조 설계, 웹 플랫폼 구축',
  validation: (Rule) => Rule.required(),
})

const kpisField = defineField({
  title: 'KPI 카드',
  name: 'kpis',
  type: 'array',
  description:
    'Hero 섹션에 최대 3개의 성과 카드를 표시합니다. 없어도 됩니다. (예) 라벨: SNS 트렌드 / 값: 진입 / 보조: X(트위터) 실시간',
  of: [
    {
      type: 'object',
      title: 'KPI 카드',
      fields: [
        {
          name: 'label',
          title: '라벨 (카드 상단 작은 텍스트)',
          type: 'string',
          description: '예) 유입 달성률 / 모델 정확도 / 응답 속도',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'value',
          title: '값 (카드 중앙 큰 숫자/텍스트)',
          type: 'string',
          description: '예) 500% / 90% / -60% / Live / 진입',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'sub',
          title: '보조 설명 (카드 하단 작은 텍스트)',
          type: 'string',
          description: '예) 목표 대비 / +40 percentage points / 2s → 0.8s',
        },
      ],
      preview: {
        select: { title: 'label', subtitle: 'value' },
      },
    },
  ],
  validation: (Rule) =>
    Rule.max(3).warning('KPI 카드는 최대 3개를 권장합니다.'),
})

const linksField = defineField({
  title: '외부 링크',
  name: 'links',
  type: 'array',
  description:
    'Hero 섹션에 버튼으로 표시됩니다. GitHub, 배포 사이트, 관련 문서 등 여러 개 추가 가능합니다.',
  of: [
    {
      type: 'object',
      title: '링크',
      fields: [
        {
          name: 'label',
          title: '버튼 라벨',
          type: 'string',
          description: '예) GitHub / 배포 사이트 / 발표 자료 / Notion 문서',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          description: '예) https://github.com/username/repo',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'icon',
          title: '아이콘',
          type: 'string',
          description:
            '아이콘을 선택하세요. 해당 아이콘이 버튼 왼쪽에 표시됩니다.',
          options: {
            list: [
              { title: 'GitHub', value: 'github' },
              { title: '글로브 (웹사이트)', value: 'globe' },
              { title: '파일 (문서)', value: 'file' },
              { title: '재생 (데모/영상)', value: 'play' },
              { title: '외부 링크', value: 'external' },
            ],
          },
          initialValue: 'external',
        },
      ],
      preview: {
        select: { title: 'label', subtitle: 'url' },
      },
    },
  ],
})

// ─── Overview 하이라이트 카드 필드 ────────────────────────────────

const overviewDescField = defineField({
  title: 'Overview - 한 줄 설명',
  name: 'overviewDesc',
  type: 'text',
  description:
    'Overview 섹션 상단에 표시되는 짧은 소개 문장입니다. (예) 설치 없이 브라우저에서 즉시 플레이 가능한 WebGL 기반 FPS 퀴즈 게임. SNS 바이럴 전략으로 X 트렌드 진입을 달성했습니다.',
  rows: 2,
})

const ICON_LIST = [
  'smartphone',
  'shield',
  'brain',
  'music',
  'message',
  'zap',
  'server',
  'cpu',
  'layers',
  'globe',
  'star',
  'code',
  'brush',
]

const overviewHighlightsField = defineField({
  title: 'Overview - 하이라이트 카드',
  name: 'overviewHighlights',
  type: 'array',
  description:
    'Overview 섹션에 카드 그리드로 표시됩니다. 프로젝트의 핵심 특징/기능을 각 카드 하나씩 입력하세요.',
  of: [
    {
      type: 'object',
      title: '하이라이트 카드',
      fields: [
        {
          name: 'icon',
          title: '아이콘',
          type: 'string',
          options: {
            list: ICON_LIST.filter((v, i, arr) => arr.indexOf(v) === i) // 중복 제거
              .sort((a, b) => a.localeCompare(b)) // ✅ 사전순
              .map((v) => ({ title: v, value: v })),
            layout: 'dropdown',
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'label',
          title: '카드 제목',
          type: 'string',
          description: '예) WebGL 실행 / NLP 엔진 / 실시간 API',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'desc',
          title: '카드 설명',
          type: 'string',
          description:
            '예) 설치 없이 브라우저에서 즉시 플레이 가능한 WebGL 구조',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      preview: {
        select: { title: 'label', subtitle: 'desc' },
      },
    },
  ],
})

// ─── Result 고정 섹션 필드 ───────────────────────────────────────

const resultOutcomesField = defineField({
  title: 'Result - 성과 목록 (Outcomes)',
  name: 'resultOutcomes',
  type: 'array',
  description:
    'Result 섹션 왼쪽 패널에 불릿 리스트로 표시됩니다. 프로젝트의 정량·정성 성과를 항목별로 입력하세요. (예) WebGL 기반 게임 배포 구조 구축 — 설치 없이 즉시 플레이',
  of: [{ type: 'string' }],
})

const resultMetricsField = defineField({
  title: 'Result - Before/After 지표 (막대그래프)',
  name: 'resultMetrics',
  type: 'array',
  description:
    'Result 섹션 오른쪽 패널에 Before/After 막대그래프로 시각화됩니다. 수치로 비교 가능한 성과 지표를 입력하세요.',
  of: [
    {
      type: 'object',
      title: '지표',
      fields: [
        {
          name: 'label',
          title: '지표 이름',
          type: 'string',
          description:
            '예) 모델 정확도 / API 응답시간 / 유입률 달성 / 테스트 시간',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'before',
          title: 'Before 값 (숫자)',
          type: 'number',
          description: '개선 전 수치. 예) 50 / 2000 / 100',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'after',
          title: 'After 값 (숫자)',
          type: 'number',
          description: '개선 후 수치. 예) 90 / 800 / 500',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'unit',
          title: '단위',
          type: 'string',
          description: '예) % / ms / 개 / 배 (빈칸 가능)',
        },
        {
          name: 'invert',
          title: '낮을수록 좋은 지표',
          type: 'boolean',
          description:
            '켜면: After가 Before보다 낮아야 "개선"으로 표시됩니다. (응답시간·오류율·비용 등) /// 끄면: After가 Before보다 높아야 "개선"으로 표시됩니다. (정확도·달성률·속도 등)',
          initialValue: false,
        },
        {
          name: 'color',
          title: '그래프 색상',
          type: 'string',
          description: 'blue = 파란색 / emerald = 초록색',
          options: {
            list: [
              { title: '파란색 (blue)', value: 'blue' },
              { title: '초록색 (emerald)', value: 'emerald' },
            ],
          },
          initialValue: 'blue',
        },
      ],
      preview: {
        select: {
          title: 'label',
          before: 'before',
          after: 'after',
          unit: 'unit',
        },
        prepare({ title, before, after, unit }: any) {
          return {
            title: title || '(지표 없음)',
            subtitle: `${before}${unit ?? ''} → ${after}${unit ?? ''}`,
          }
        },
      },
    },
  ],
})

// ─── 본문 섹션 배열 필드 ─────────────────────────────────────────

const sectionsField = defineField({
  title: '본문 섹션',
  name: 'sections',
  type: 'array',
  description:
    '각 섹션이 웹페이지의 하나의 목차 항목이 됩니다. 순서대로 렌더링되며, 사이드바 목차에 자동으로 반영됩니다.',
  of: [
    // 타입 A: Portable Text 섹션
    {
      type: 'object',
      name: 'contentSection',
      title: '텍스트/이미지 섹션',
      fields: [
        {
          name: 'title',
          title: '섹션 제목 (목차에 표시)',
          type: 'string',
          description:
            '사이드바 목차와 본문 헤더에 표시됩니다. (예) Problem / Solution / Implementation / Problem Solving / Insight',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'body',
          title: '본문 (Portable Text)',
          type: 'array',
          description:
            '자유롭게 작성하세요. h2를 사용하면 섹션 내 소제목이 됩니다 (목차에는 표시되지 않음). 이미지, 코드, 표 등 모두 삽입 가능합니다.',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } },
            { type: 'code' },
            defineArrayMember({ type: 'math' }),
            defineArrayMember({ type: 'featureTable' }),
          ],
        },
      ],
      preview: {
        select: { title: 'title' },
        prepare({ title }) {
          return { title: `📝 ${title || '(제목 없음)'}` }
        },
      },
    },

    // 타입 B: 갤러리 섹션
    {
      type: 'object',
      name: 'gallerySection',
      title: '갤러리 섹션',
      fields: [
        {
          name: 'title',
          title: '섹션 제목 (목차에 표시)',
          type: 'string',
          description:
            '사이드바 목차와 본문 헤더에 표시됩니다. (예) 스크린샷 / 디자인 / 결과물',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'images',
          title: '이미지 목록',
          type: 'array',
          description:
            '표시할 이미지들을 순서대로 업로드하세요. 그리드 형태로 표시됩니다.',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'caption',
                  title: '이미지 설명 (선택)',
                  type: 'string',
                  description: '이미지 하단에 표시될 캡션입니다.',
                },
              ],
            },
          ],
        },
      ],
      preview: {
        select: { title: 'title', images: 'images' },
        prepare({ title, images }) {
          return {
            title: `🖼 ${title || '(제목 없음)'}`,
            subtitle: `이미지 ${(images || []).length}장`,
          }
        },
      },
    },
  ],
})

// ─── 레거시 필드 (기존 데이터 호환용, 신규 입력은 sections 사용) ──────────────

const imagesField = defineField({
  title: '[레거시] 추가 이미지들',
  name: 'images',
  description:
    '⚠️ 구버전 필드입니다. 신규 프로젝트는 갤러리 섹션을 사용하세요.',
  type: 'array',
  of: [{ type: 'image' }],
})

const contributionField = defineField({
  title: '핵심 성과',
  name: 'contribution',
  description: '핵심 성과 내용을 쉼표로 구분',
  type: 'text',
  validation: (Rule) => Rule.required(),
})

const contentField = defineField({
  title: '프로젝트 설명',
  name: 'content',
  description: '개요, 기여, 사용 기술, 느낀점 등',
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
    defineArrayMember({ type: 'featureTable' }), // 표 추가
  ],
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
              { title: '문제', value: 0 },
              { title: '해결', value: 1 },
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
          let { type, title } = selection
          type = type === 0 ? '문제' : '해결'
          return {
            title: `${type} : ${title}`,
          }
        },
      },
    },
  ],
})

// ─── defineType ───────────────────────────────────────────────────────────────
export default defineType({
  title: '프로젝트',
  name: 'project',
  type: 'document',
  groups: [
    { name: 'meta', title: '기본 정보', default: true },
    { name: 'hero', title: 'Hero 영역' },
    { name: 'body', title: '본문 섹션' },
    { name: 'related', title: '관련 프로젝트' },
    { name: 'legacy', title: '레거시 (구버전 데이터)' },
  ],
  fields: [
    // 기본 정보
    { ...serialField, group: 'meta' },
    { ...isPublicField, group: 'meta' },
    { ...typeField, group: 'meta' },
    { ...titleField, group: 'meta' },
    { ...summaryField, group: 'meta' },
    { ...startDateField, group: 'meta' },
    { ...releaseDateField, group: 'meta' },
    { ...skillField, group: 'meta' },

    // Hero 영역
    { ...thumbnailField, group: 'hero' },
    { ...roleField, group: 'hero' },
    { ...kpisField, group: 'hero' },
    { ...linksField, group: 'hero' },

    // 본문
    // Overview 카드
    { ...overviewDescField, group: 'body' },
    { ...overviewHighlightsField, group: 'body' },

    // Result 고정 섹션
    { ...resultOutcomesField, group: 'body' },
    { ...resultMetricsField, group: 'body' },

    // 나머지 자유 섹션
    { ...sectionsField, group: 'body' },

    // 관련 프로젝트
    { ...relatedProjectsField, group: 'related' },

    // 레거시
    { ...contentField, group: 'legacy' },
    { ...imagesField, group: 'legacy' },
    { ...contributionField, group: 'legacy' },
    { ...contentOverviewField, group: 'legacy' },
    { ...contentContributionField, group: 'legacy' },
    { ...contentSkillField, group: 'legacy' },
    { ...contentReflectionField, group: 'legacy' },
    { ...troubleShootingsField, group: 'legacy' },
  ],
  preview: {
    select: {
      title: 'title',
      types: 'projectTypes',
      isPublic: 'isPublic',
      serial: 'serial',
      media: 'thumbnail',
    },
    prepare({ title, types = {}, isPublic, serial, media }) {
      const typeLabels: Record<string, string> = {
        engineering: '개발',
        planning: '기획',
        design: '디자인',
      }
      const activeTypes = Object.entries(types)
        .filter(([_, v]) => v === true)
        .map(([k]) => typeLabels[k])
        .join(' | ')
      const visibility = isPublic === false ? '🔒 비공개' : '🌐 공개'
      const serialLabel = serial ? `[${serial}] ` : ''
      return {
        title: `${serialLabel}${title || '(제목 없음)'}`,
        subtitle: `${visibility} | ${activeTypes || '분류 없음'}`,
        media,
      }
    },
  },
})
