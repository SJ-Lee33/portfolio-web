import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .title('portfolio')
    .items([
      // S.documentTypeListItem('post').title('Posts'),
      // S.documentTypeListItem('category').title('Categories'),
      // S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('study').title('Study'),
      S.documentTypeListItem('history').title('이력'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['study'].includes(item.getId()!),
        (item) =>
          item.getId() &&
          !['study', 'history', 'project'].includes(item.getId()!),
      ),
    ])
