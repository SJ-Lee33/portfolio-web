import { urlFor } from '@/lib/sanity'

export function enrichPortableTextWithImageUrl(blocks: any[]): any[] {
  return blocks.map((block) => {
    if (block._type === 'image' && block.asset?._ref) {
      return {
        ...block,
        url: urlFor(block.asset).url(),
      }
    }
    return block
  })
}
