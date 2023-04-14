import {CdgBaseComponent} from '../../../shared/base-component'
import template from './simple.section.html'

export class CdgTableSimpleSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleSimpleTable')
    table.data = [
      {
        first: 'Row 1',
        second: 'Second column data',
        third: 'Third column data with longer text than the others - row 1',
      },
      {
        first: 'Row 2',
        second: 'Second column',
        third: 'Third column data with longer text than the others - row 2',
      },
      {
        first: 'Row 3',
        second: 'Second of row 3',
        third: 'Third column data with longer text than the others - row 3',
      },
    ]
  }
}
