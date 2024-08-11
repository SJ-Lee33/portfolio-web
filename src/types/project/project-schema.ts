interface ProjectSchema {
  id: string
  title: string

  projectTypes: {
    design: boolean
    development: boolean
    marketing: boolean
  }

  releaseDate: string
  duration: string

  role: string
  contribution: string
  skill?: string[]

  summary: string
  thumbnail: string
  contents: [] // portable text (type:block)
}
