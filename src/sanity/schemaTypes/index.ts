import { type SchemaTypeDefinition } from 'sanity'

import history from './history/history'
import project from './project/project'
import study from './study/study'

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [blockContentType, history, project, studyList, study],
// }

// export const schema = [history, project, studyList, study]
export const schema = [study, history, project]
