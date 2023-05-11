import { CdgBaseComponent } from '../../../shared/base-component'
import template from './editable.section.html'

export class CdgTableEditableSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleEditableTable')
      table.options = {
        columns: [
          {
            name: 'First',
            width: 'auto',
            fieldName: 'first',
            editable: true,
            colummTemplate: this.querySelector('.first'),
          },
          {
            name: 'Second',
            width: 'auto',
            fieldName: 'second',
            editable: true,
          },
          {
            name: 'Third',
            width: 'auto',
            fieldName: 'third',
            editable: true,
            colummTemplate: this.querySelector('.third'),
          },
        ],
        onRowChange: this.handleRowChange.bind(this),
      }

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

  handleRowChange(event, data) {
    cdgToastService.toast('Row changed at index: ' + data.rowIndex)
  }
}
