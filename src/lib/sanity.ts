import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const SANITY_DATASET = 'production'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-08-07', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN,
})

export const assetsURL = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-08-07/assets/images/${SANITY_DATASET}`

export const uploadAsset = async (file: Blob) => {
  const res = await fetch(assetsURL, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      Authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
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
