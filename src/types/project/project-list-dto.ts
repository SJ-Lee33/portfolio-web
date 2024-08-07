export type ProjectListDto = {
  type?: 'development' | 'design' | 'marketing'
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
