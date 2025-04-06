import { client } from '@/lib/sanity'
import { ProjectDTO } from '@/types/project/project-dto'
import { getDurationDate } from '@/utils/calculateDuration'
import { enrichPortableTextWithImageUrl } from '@/utils/enrichPortableImage'
import { urlFor } from '@/lib/sanity'

export const getProjectById = async (
  id: string,
): Promise<ProjectDTO | undefined> => {
  try {
    const data = await client.fetch(
      `*[_type == "project" && _id == $id]{
                ...,
                "id": _id,
                contentOverview,
                contentContribution,
                contentSkill,
                contentReflection,
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
                        "startDate": startDate,
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
    const { startDate, releaseDate, troubleShootings, ...rest } = data

    const duration =
      startDate && releaseDate
        ? getDurationDate(startDate, releaseDate)
        : undefined

    const updatedAt = data._updatedAt

    const enrichedTroubleShootings = troubleShootings?.map((item: any) => ({
      ...item,
      troubleShootingContent: enrichPortableTextWithImageUrl(
        item.troubleShootingContent,
      ),
    }))

    const result = {
      ...rest,
      contentOverview: enrichPortableTextWithImageUrl(data.contentOverview),
      contentContribution: enrichPortableTextWithImageUrl(
        data.contentContribution,
      ),
      contentSkill: enrichPortableTextWithImageUrl(data.contentSkill),
      contentReflection: enrichPortableTextWithImageUrl(data.contentReflection),
      troubleShootings: enrichedTroubleShootings,

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
