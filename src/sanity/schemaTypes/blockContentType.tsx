import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Cita', value: 'blockquote'},
        {title: 'Objeción', value: 'objection'},
        {title: 'Declaración', value: 'declaration'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Rojo',
            value: 'red',
            icon: () => '🟥',
          },
          {
            title: 'Superíndice',
            value: 'sup',
            icon: () => '¹',
          },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {title: 'URL', name: 'href', type: 'url'},
            ],
          },
          {
            title: 'Nota expandible',
            name: 'note',
            type: 'object',
            fields: [
              {
                title: 'Contenido de la nota',
                name: 'content',
                type: 'array',
                of: [
                  { type: 'block' },
                  {
                    type: 'object',
                    name: 'link',
                    title: 'Enlace',
                    fields: [
                      { name: 'href', type: 'url', title: 'URL' },
                      { name: 'text', type: 'string', title: 'Texto del enlace' }
                    ]
                  }
                ]
              }
            ]
          }
        ],
      },
      components: {
        block: (props) => {
          const {style} = props.value;

          // Manejar estilos específicos
          switch (style) {
            case 'h1':
              return <h1>{props.children}</h1>;
            case 'h2':
              return <h2>{props.children}</h2>;
            case 'h3':
              return <h3>{props.children}</h3>;
            case 'h4':
              return <h4>{props.children}</h4>;
            case 'blockquote':
            case 'objection':
              return (
                <blockquote style={{borderLeft: '2px solid #ccc', paddingLeft: '1em', color: '#666'}}>
                  {props.children}
                </blockquote>
              );
            default:
              // Usar <p> solo para estilos normales
              return <p>{props.children}</p>;
          }
        },
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alternative Text'},
      ]
    }),
  ],
})