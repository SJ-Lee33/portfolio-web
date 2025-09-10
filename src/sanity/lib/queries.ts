import { defineQuery } from 'next-sanity'

// 스터디 종류
export const STUDY_TYPE_QUERY = defineQuery(`*[_type == "studylist"]{
  _id, title
}`)

// 전체 스터디 목록
export const STUDY_LIST_QUERY = defineQuery(`
*[
  _type == "study" && defined(serial)
] | order(serial asc) {
  "slug": string(serial)         // 정적 경로용 문자열 슬러그
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
  "id": _id,
  title,
  serial
}
`)
