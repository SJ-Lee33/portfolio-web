# Portfolio Web

개인 포트폴리오 웹사이트입니다.
Next.js 기반 프론트엔드와 Sanity CMS를 결합하여 콘텐츠 관리와 정적 페이지 렌더링을 분리한 구조로 설계되었습니다.

## Run Summary

| 항목               | 명령어                         |
| ------------------ | ------------------------------ |
| Frontend 실행      | `npm run dev`                  |
| Sanity Studio 접속 | `http://localhost:3000/studio` |
| Sanity Studio 배포 | `npx sanity deploy`            |
| TypeGen 실행       | `npx sanity typegen generate`  |

## 프로젝트 목포

- 콘텐츠 관리와 프론트엔드 분리
- Next.js App Router 기반의 구조적 라우팅
- Sanity Studio를 동일 프로젝트 내부에서 운영
- 타입 안정성을 고려한 데이터 흐름 설계

--

# Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## CMS

- Sanity Studio
- GROQ Query

## Deployment

- Vercel (Frontend)
- Sanity Cloud (CMS)

--

# System Archetecture

                ┌──────────────────────┐
                │      Sanity CMS      │
                │   (Content Editor)   │
                └─────────┬────────────┘
                          │
                          │ GROQ Query
                          │
                ┌─────────▼────────────┐
                │     Next.js App      │
                │   (Frontend Layer)   │
                └─────────┬────────────┘
                          │
                          │ SSR / SSG
                          │
                ┌─────────▼────────────┐
                │        Browser        │
                │     Portfolio UI      │
                └──────────────────────┘

--

# Local Development

## 1) Frontend 실행

```bash
    npm install
    npm run dev
```

## 2) Sanity Studio 실행

Sanity Studio는 **Next.js 프로젝트 내부에 통합** 되어 있습니다.

```
http://localhost:3000/studio
```

--

# Sanity Deployment

Sanity Studio를 배포하려면 다음 명령어를 실행합니다.

```
npx sanity deploy
```

# Sanity Type Generation (TypeGen)

GROQ Query 결과를 TypeScript 타입으로 자동 생성하기 위해
Sanity TypeGen을 사용합니다.

## 사용법

### 1. 쿼리 정의

```typescript
import { defineQuery } from 'next-sanity'

export const RESUME_QUERY = defineQuery(`
  *[_type == "resume"][0]{
    "resumeUrl": file.asset->url
  }
`)
```

### 2. 타입 생성

`npx sanity typegen generate`
실행 시, `RESUME_QUERYResult` 자동 생성됨

### 주의사항

- Query 수정 후 반드시 재실행 필요
- Schema 변경 후에도 재실행 필요

--

# System Archetecture

```
                    ┌──────────────────────┐
                    │      Sanity CMS      │
                    │   (Content Editor)   │
                    └─────────┬────────────┘
                              │
                              │ GROQ Query
                              │
                    ┌─────────▼────────────┐
                    │     Next.js App      │
                    │   (Frontend Layer)   │
                    └─────────┬────────────┘
                              │
                              │ SSR / SSG
                              │
                    ┌─────────▼────────────┐
                    │        Browser        │
                    │     Portfolio UI      │
                    └──────────────────────┘
```

- 콘텐츠는 Sanity CMS에서 관리
- Next.js는 GROQ Query로 데이터를 가져와 렌더링
- App Router 기반 페이지 구조 사용
- Sanity Studio는 Next.js 프로젝트 내부에 통합

--

# Routing Structure (Next.js App Router)

이 프로젝트는 Next.js App Router 구조를 사용합니다.

```
app/
 ├ (main)/
 │   ├ (home)/
 │   │   └ page.tsx      → /
 │   ├ profile/
 │   │   └ page.tsx      → /profile
 │   ├ project/
 │   │   └ [slug]/
 │   │       └ page.tsx  → /project/{slug}
 │   └ study/
 │       └ page.tsx      → /study
```

프로젝트 slug는 넘버링으로 관리됩니다. (1, 2, 3, ...)
