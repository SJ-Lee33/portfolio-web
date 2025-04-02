export type ProjectListDto = {
  type?: 'development' | 'design' | 'marketing'
} & Pick<
  ProjectSchema,
  | 'id'
  | 'projectTypes'
  | 'startDate'
  | 'releaseDate'
  | 'skill'
  | 'summary'
  | 'thumbnail'
  | 'title'
>
