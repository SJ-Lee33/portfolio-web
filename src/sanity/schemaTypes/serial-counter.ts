import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'serialCounter',
  title: 'Serial Counter',
  type: 'document',
  fields: [
    defineField({name: 'scope', type: 'string', readOnly: true}), // 예: "study"
    defineField({name: 'last', type: 'number', readOnly: true}), // 마지막 발급 번호
  ],
})
