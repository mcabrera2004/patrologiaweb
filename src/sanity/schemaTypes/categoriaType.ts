import { defineType } from 'sanity'

export const categoriaType = defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'priority',
      title: 'Prioridad',
      type: 'number',
      description: 'Un número menor significa mayor prioridad',
      initialValue: 1,
    },
  ],
})