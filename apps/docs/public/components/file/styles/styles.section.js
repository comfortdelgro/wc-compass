import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgFileStylesSection extends CdgTableComponentSection {
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
        name: '<code>upload-button</code>',
        description:
          'Add to container of content except for <code>input file</code>.',
      },
      {
        name: '<code>cdg-file-input</code>',
        description: 'Add to <code>input file</code>.',
      },
    ]
  }
}
