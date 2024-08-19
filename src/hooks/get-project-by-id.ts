import { client } from '@/lib/sanity'
import { ProjectDTO } from '@/types/project/project-dto'

export const getProjectById = async (
  id: string,
): Promise<ProjectDTO | undefined> => {
  try {
    const data = await client.fetch(
      `*[_type == "project" && _id == $id]{
                ...,
                "id": _id,
                contents,
                troubleShootings,
                contribution,
                duration,
                projectTypes,
                releaseDate,
                role,
                skill,
                "thumbnail":thumbnail.asset->url,
                title,
                "imageUrls": images[].asset->url,

                "relatedProjects": relatedProjects[]{
                    "reference": reference->{
                        "id": _id,
                        "title": title,
                        "projectTypes": projectTypes,
                        "releaseDate": releaseDate,
                        "skill": skill,
                        "summary": summary,
                        "thumbnail": thumbnail.asset->url
                    }
                }

            }[0]`,
      {
        id,
      },
      {
        cache: 'no-store', // 캐시 사용 안 함
      },
    )
    const { ...rest } = data

    const result = {
      ...rest,
    } as ProjectDTO

    return { ...result }
  } catch (error) {
    console.log(error)
  }
}
