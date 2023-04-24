import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCheckboxStylesSection extends CdgTableComponentSection {
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
        name: '<code>rounded</code>',
        description: 'To round the progress corners.',
      },
    ]
  }
}
