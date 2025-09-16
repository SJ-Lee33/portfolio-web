import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId, token } from '../sanity/env'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing SANITY_PROJECT_ID in .env.local')
}
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // 가이드에선 true로 했었음
})

export const assetsURL = `https://${projectId}.api.sanity.io/v${apiVersion}/assets/images/${dataset}`

export const uploadAsset = async (file: Blob) => {
  const res = await fetch(assetsURL, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      Authorization: `Bearer ${token}`,
    },
    body: file,
  })
  const { document } = await res.json()
  return document
}

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
