import {CdgBaseComponent} from '../../../shared/base-component'
import template from './simple.section.nested.html'

export class CdgTableSimpleSectionNested extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleSimpleTableNested')
    table.data = [
      {
        first: 'Row 1',
        second: 'Second column data',
        third: 'Third column data with longer text than the others - row 1',
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
        first: 'Row 2',
        second: 'Second column',
        third: 'Third column data with longer text than the others - row 2',
        fourth: ''
      },
      {
        first: 'Row 3',
        second: 'Second of row 3',
        third: 'Third column data with longer text than the others - row 3',
        fourth: ''
      },
    ]
  }
}
