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

  summary?: string
  thumbnail: string
  contents: [] // portable text
  troubleShootings?: {
    troubleShootingType: number
    troubleShootingTitle: string
    troubleShootingContent: [] // portable text
  }[]

  imageUrls?: string[]
  relatedProjects?: {
    reference?: {
      id: ProjectSchema['id']
      title: ProjectSchema['title']
      projectTypes: ProjectSchema['projectTypes']
      releaseDate: ProjectSchema['releaseDate']
      skill?: ProjectSchema['skill']
      summary: ProjectSchema['summary']
      thumbnail: ProjectSchema['thumbnail']
    }
  }[]
}
