/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import {
  defineConfig,
  type DocumentActionComponent,
  type DocumentActionsContext,
} from 'sanity'
import { structureTool } from 'sanity/structure'
// import {media} from 'sanity-plugin-media'
import { codeInput } from '@sanity/code-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { PublishWithSerialActionAtStudy } from './src/sanity/lib/publish-with-serial'

export default defineConfig({
  basePath: '/studio',
  title: 'portfolio',
  projectId: projectId,
  dataset: dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schema,
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // media(),
    codeInput(),
  ],
  document: {
    actions: (
      prev: DocumentActionComponent[],
      context: DocumentActionsContext,
    ): DocumentActionComponent[] => {
      if (context.schemaType === 'study') {
        const withoutDefaultPublish = prev.filter((a) => a.action !== 'publish')

        return [
          PublishWithSerialActionAtStudy,
          ...withoutDefaultPublish,
        ] as DocumentActionComponent[]
      }
      return prev
    },
  },
})
