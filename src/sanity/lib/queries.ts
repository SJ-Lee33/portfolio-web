import { defineQuery } from 'next-sanity'

// 레주메 다운로드 링크
export const RESUME_QUERY = defineQuery(`
*[
  _type == "resume" &&
  !(_id in path("drafts.**"))
][0]{
  "resumeUrl": file.asset->url
}
`)

// 이력
export const HISTORY_QUERY =
  defineQuery(`*[_type == "history" && !(_id in path('drafts.**')) ] | order(year){
    'id': _id,
    year,
    content,
 }`)

// 프로젝트 목록
export const PROJECT_LIST_QUERY = defineQuery(`
*[
  _type == "project" && 
  !(_id in path("drafts.**")) &&
  defined(serial) &&
  isPublic != false &&
  (
    $projectType == null ||
    select(
      $projectType == "engineering" => coalesce(projectTypes.engineering, false) == true,
      $projectType == "design"      => coalesce(projectTypes.design, false) == true,
      $projectType == "planning"   => coalesce(projectTypes.planning, false) == true,
      true
    ) // 전부 false면 전체 불러오기
  )
] | order(coalesce(releaseDate, _updatedAt, _createdAt) desc) {
  "id": _id,
  "slug": string(serial),
  title,
  projectTypes,
  startDate,
  releaseDate,
  "skill": skill[],
  summary,
  "thumbnail": coalesce(thumbnail.asset->url, "")
}
`)

// 총 프로젝트 개수
export const PROJECT_COUNT_QUERY = defineQuery(`
count(*[
  _type == "project" &&
  !(_id in path("drafts.**")) &&
  isPublic != false &&
  (
    $projectType == null ||
    select(
      $projectType == "engineering" => coalesce(projectTypes.engineering, false) == true,
      $projectType == "design"      => coalesce(projectTypes.design, false) == true,
      $projectType == "planning"   => coalesce(projectTypes.planning, false) == true,
      true
    )
  )
])
`)

// 단일 프로젝트 포스트
export const PROJECT_QUERY = defineQuery(`
*[
  _type == "project" && 
  defined(serial) &&
  // isPublic != false &&
  (
    serial == $sNum ||
    string(serial) == $sStr
  )
][0]{
  serial,
  isPublic,
  title,
  summary,
  projectTypes,
  startDate,
  releaseDate,
  role,
  contribution,
  "updatedAt": _updatedAt,

  skill[],
  kpis[],
  "links": links[]{
    label,
    url,
    icon
  },

  // Overview 카드 섹션
  overviewDesc,
  overviewHighlights[],

  // Result 고정 섹션
  resultOutcomes[],
  resultMetrics[],

  "thumbnail": coalesce(thumbnail.asset->url, ""),

  // 새 본문 섹션 배열
  "sections": sections[]{
    _type,
    title,
    // contentSection인 경우
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    },
    // gallerySection인 경우
    "images": images[]{
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      caption
    }
  },

  // 레거시 필드 (구버전 데이터 호환)
  content[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  "imgUrls": coalesce(images[].asset->url, ""),

  "relatedProjects": relatedProjects[]{
    "reference": reference->{
      title,
      serial,
      projectTypes,
      startDate,
      releaseDate,
      skill[],
      summary,
      "thumbnail": coalesce(thumbnail.asset->url, "")
    }
  }
}
`)

// 전체 스터디 목록
export const STUDY_LIST_QUERY = defineQuery(`
*[
  _type == "study" && 
  !(_id in path("drafts.**")) &&
  isPublic != false &&
  defined(serial) 
] | order(serial desc) {
  "slug": string(serial),
  title,
  "skill": skill[],
  "thumbnail": coalesce(thumbnail.asset->url, ""),
  studyTypes,
  "createdAt":_createdAt,
  "updatedAt":_updatedAt,
}
`)

// 카테고리 목록들과, 각 목록 별 최근 문서 3개
export const STUDY_CATEGORY_AND_RECENT_QUERY = defineQuery(`
  *[
    _type == "studyCategory" &&
    !(_id in path("drafts.**")) &&        // ⬅️ 루트에서 draft 제외
    defined(slug) &&                 // ⬅️ slug 없는 문서 제외(안전망)
    isPublic != false
  ] | order(title asc) {
    _id,
    title,
    slug,
    skill[],
    studyTypes,
    summary,
    "thumbnail": coalesce(thumbnail.asset->url, ""),
    "recentFivePosts": *[
      _type == "study" && 
      !(_id in path("drafts.**")) &&
      isPublic != false &&
      references(^._id)
    ] | order(_createdAt desc)[0...3]{
      _id,
      title,
      "slug": string(serial),
      "updatedAt":_updatedAt,
      "thumbnail": coalesce(thumbnail.asset->url, ""),
    }
  }
`)

// 카테고리 별 문서 목록 전체
export const STUDY_CATEGORY_PAGE_QUERY = defineQuery(`
*[_type=="studyCategory" && slug==$categorySlug][0]{
  _id,
  title,
  slug,
  summary,
  "thumbnail": coalesce(thumbnail.asset->url, ""),
  skill[],
  // 총 개수
  "totalCount": count(*[
    _type=="study" && !(_id in path("drafts.**")) && references(^._id) && isPublic != false 
  ]),
  // 페이지 슬라이스
  "studyPosts": *[
    _type=="study" && !(_id in path("drafts.**")) && references(^._id) && isPublic != false
  ] | order(_createdAt desc){
    _id,
    title,
    "slug": string(serial), // 라우팅 키: /study/[serial]
    "updatedAt": _updatedAt,
    "thumbnail": coalesce(thumbnail.asset->url,""),
  }
}
`)

// 단일 스터디 포스트
export const STUDY_QUERY = defineQuery(`
*[
  _type == "study" &&
  defined(serial) &&
  // isPublic != false &&
  (
    serial == $sNum ||           // number 비교
    string(serial) == $sStr      // string 비교
  )
][0]{
  // "키 이름" : 표현식
  // 따옴표 없으면 동일한 이름
  "slug": string(serial),
  isPublic,
  title,
  "categoryTitle": studyCategory->title,
  "categorySlug": studyCategory->slug,
  serial,
  "skill": skill[],
  "thumbnail": coalesce(thumbnail.asset->url, ""),
  "body": body[],
  "createdAt":_createdAt,
  "updatedAt":_updatedAt,
}
`)

export const STUDY_NEIGHBORS_QUERY = defineQuery(`
*[
  _type == "study" &&
  defined(serial) &&
  isPublic != false &&
  (serial == $sNum || string(serial) == $sStr)
][0]{
  // 현재 문서의 기준 값
  "categoryId": category._ref,
  "serial": serial,

  // 직전(위) 최대 2개: serial이 더 작은 것들, 앞에서 4개
  "prev": *[
    _type == "study" &&
    defined(serial) &&
    serial < ^.serial &&
    isPublic != false &&
    select(defined(^.categoryId) => category._ref == ^.categoryId, true)
  ] | order(serial desc) [0...4]{
    "slug": string(serial),
    title,
    "date": coalesce(_createdAt, _updatedAt)
  },

  // 직후(아래) 최대 2개: serial이 더 큰 것들, 앞에서 4개
  "next": *[
    _type == "study" &&
    defined(serial) &&
    serial > ^.serial &&
    isPublic != false &&
    select(defined(^.categoryId) => category._ref == ^.categoryId, true)
  ] | order(serial desc) [0...4]{
    "slug": string(serial),
    title,
    "date": coalesce(_createdAt, _updatedAt)
  }
}
`)
