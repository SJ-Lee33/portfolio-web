import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('portfolio')
    .items([
      S.documentTypeListItem('history').title('이력'),
      S.documentTypeListItem('project').title('프로젝트'),
      S.documentTypeListItem('study').title('학습 내역'),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['study', 'history', 'project'].includes(item.getId()!),
      ),
    ])
