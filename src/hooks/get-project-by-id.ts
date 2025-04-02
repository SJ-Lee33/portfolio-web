import { client } from '@/lib/sanity'
import { ProjectDTO } from '@/types/project/project-dto'
import { getDurationDate } from '@/utils/calculateDuration'

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
                projectTypes,
                startDate,
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
    const { startDate, releaseDate, ...rest } = data
    const duration =
      startDate && releaseDate
        ? getDurationDate(startDate, releaseDate)
        : undefined
    const updatedAt = data._updatedAt
    const result = {
      ...rest,
      startDate,
      releaseDate,
      duration,
      updatedAt,
    } as ProjectDTO

    return { ...result }
  } catch (error) {
    console.log(error)
  }
}
