import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgToggleStylesSection extends CdgTableComponentSection {
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
        name: '<code>cdg-toggle</code>',
        description: 'To use comfortdelgro checkbox styles.',
      },
      {
        name: '<code>large</code>',
        description: 'To display larger toggle button.',
      },
    ]
  }
}
