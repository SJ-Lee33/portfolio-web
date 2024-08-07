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

  skill?: {
    C: boolean
    CSharp: boolean
    Java: boolean
    Python: boolean
    HTML: boolean
    CSS: boolean
    React: boolean
    JavaScript: boolean
    TypeScript: boolean
    Kotlin: boolean
    Sanity: boolean
    Cloudinary: boolean
    Firebase: boolean
    AWS: boolean
    Figma: boolean
    Photoshop: boolean
    Illustrator: boolean
    PreimierePro: boolean
    AfterEffects: boolean
    Unity: boolean
  }

  summary: string
  thumbnail: string
  contents: [] // portable text (type:block)
}
