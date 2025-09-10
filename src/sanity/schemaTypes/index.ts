import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { studyType } from './studyType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, studyType],
}
