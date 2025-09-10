import { defineQuery } from 'next-sanity'

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
  (
    $projectType == null ||
    select(
      $projectType == "development" => coalesce(projectTypes.development, false) == true,
      $projectType == "design"      => coalesce(projectTypes.design, false) == true,
      $projectType == "marketing"   => coalesce(projectTypes.marketing, false) == true,
      true
    ) // 전부 false면 전체 불러오기
  )
] | order(coalesce(releaseDate, _updatedAt, _createdAt) desc) [
  $offset...($offset + $limit)
]{
  "id": _id,
  title,
  projectTypes,
  startDate,
  releaseDate,
  "skill": skill[],
  summary,
  "thumbnail": coalesce(thumbnail.asset->url, "")
}
`)

// --- 타입젠용: 상수 슬라이스(예: 0..50) → TypeGen만 이걸 읽어 타입 생성 ---
export const PROJECT_LIST_QUERY_TG = defineQuery(`
*[
  _type == "project" &&
  !(_id in path("drafts.**")) &&
  (
    $projectType == null ||
    select(
      $projectType == "development" => coalesce(projectTypes.development, false) == true,
      $projectType == "design"      => coalesce(projectTypes.design, false) == true,
      $projectType == "marketing"   => coalesce(projectTypes.marketing, false) == true,
      true
    )
  )
] | order(coalesce(releaseDate, _updatedAt, _createdAt) desc) [0...50]{
  "id": _id,
  title,
  projectTypes,
  startDate,
  releaseDate,
  "skill": skill[],
  summary,
  "thumbnail": coalesce(thumbnail.asset->url, "")
}
`)

// 총 포스트 개수
export const PROJECT_COUNT_QUERY = defineQuery(`
count(*[
  _type == "project" &&
  !(_id in path("drafts.**")) &&
  (
    $projectType == null ||
    select(
      $projectType == "development" => coalesce(projectTypes.development, false) == true,
      $projectType == "design"      => coalesce(projectTypes.design, false) == true,
      $projectType == "marketing"   => coalesce(projectTypes.marketing, false) == true,
      true
    )
  )
])
`)

// 단일 프로젝트 포스트
export const PROJECT_QUERY = defineQuery(`
*[
  _type == "project" 
][0]{
  // "키 이름" : 표현식
  // 따옴표 없으면 동일한 이름
  "id": _id,
  title,
  projectTypes,
  startDate,
  releaseDate,
  duration,
  
  role,
  contribution,
  "skill": skill[],

  summary,
  "thumbnail": coalesce(thumbnail.asset->url, ""),
  "contentOverview": contentOverview[],
  "contentContribution": contentContribution[],
  "contentSkill": contentSkill[],
  "contentReflection": contentReflection[],
  
  troubleShooting,
  imgUrls,
  relatedProjects,
  updatedAt
}
`)

// 스터디 종류
export const STUDY_TYPE_QUERY = defineQuery(`*[_type == "studylist"]{
  _id, title
}`)

// 전체 스터디 목록
export const STUDY_LIST_QUERY = defineQuery(`
*[
  _type == "study" && defined(serial)
] | order(serial asc) {
  "slug": string(serial)
}
`)

// 단일 스터디 포스트
export const STUDY_QUERY = defineQuery(`
*[
  _type == "study" &&
  defined(serial) &&
  (
    serial == $sNum ||           // number 비교
    string(serial) == $sStr      // string 비교
  )
][0]{
  // "키 이름" : 표현식
  // 따옴표 없으면 동일한 이름
  "id": _id,
  title,
  serial,
  "skill": skill[],
  "thumbnail": coalesce(thumbnail.asset->url, ""),
  "learningGoal": learningGoal[],
  "learningOutcome": learningOutcome[],
  "learningProcess": learningProcess[],
  "learningInsight": learningInsight[],
  "learningPlan": learningPlan[],
  updatedAt
}
`)
