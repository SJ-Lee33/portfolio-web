export type ProjectListDto = {
  placeName: string
  displayAddress: string
  type: 'development' | 'design' | 'marketing'
} & Pick<
  ProjectSchema,
  | 'id'
  | 'projectTypes'
  | 'releaseDate'
  | 'skill'
  | 'summary'
  | 'thumbnail'
  | 'title'
>
