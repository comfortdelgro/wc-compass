import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCardStylesSection extends CdgTableComponentSection {
  constructor() {
    super('CSS Class Name')
    this.tableOptions = {
      columns: [
        {
          name: 'Class Name',
          width: '30%',
          fieldName: 'name',
        },
        {
          name: 'Description',
          width: 'auto',
          fieldName: 'description',
        },
      ],
    }

    this.data = [
      {
        name: '<code>cdg-card</code>',
        description: "Apply card's styles for HTML element.",
      },
      {
        name: '<code>raised</code>',
        description: 'Add box-shadow to card.',
      },
      {
        name: '<code>cdg-card-float-content</code>',
        description:
          'Add to content of <code>cdg-card-float-content</code> to make content overlap <code>cdg-card-cover</code>.',
      },
      {
        name: '<code>article-card</code>',
        description: 'Horizontal layout for blogs.',
      },
    ]
  }
}
