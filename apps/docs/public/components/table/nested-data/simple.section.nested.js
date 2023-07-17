import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './simple.section.nested.html'

export class CdgTableSimpleSectionNested extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleSimpleTableNested')
    table.options = {
      headClass: ['has-border'],
      columns: [
        {
          name: 'First',
          fieldName: 'first',
          align: 'center',
          width: '100px',
        },
        {
          name: 'Second',
          fieldName: 'second',
          align: 'center',
          width: '100px',
        },
        {
          name: 'Third',
          fieldName: 'third',
          align: 'center',
          width: '100px',
        },
        {
          name: 'Fourth',
          fieldName: 'fourth',
          align: 'center',
          table: {
            columns: [
              {
                name: 'Child 1',
                fieldName: 'child1',
                align: 'center',
              },
              {
                name: 'Child 2',
                fieldName: 'child2',
                align: 'center',
              },
              {
                name: 'Child 3',
                fieldName: 'child3',
                align: 'center',
              },
            ],
          },
        },
      ],
    }

    table.data = [
      {
        first: 'first 1',
        second: 'second 1',
        third: 'third 1',
        fourth: [
          {
            child1: 'Child Row 1',
            child2: 'Child sample data generate',
            child3: 'Child sample data generate',
          },
          {
            child1: 'Child Row 2',
            child2: 'Child sample data generate',
            child3: 'Child sample data generate',
          },
          {
            child1: 'Child Row 3',
            child2: 'Child sample data generate',
            child3: 'Child sample data generate',
          },
        ],
      },
      {
        first: 'first 2',
        second: 'second 2',
        third: 'third 2',
      },
      {
        first: 'first 2',
        second: 'second 2',
        third: 'third 2',
      },
    ]
  }
}
