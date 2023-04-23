import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgFooterStylesSection extends CdgTableComponentSection {
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
        name: '<code>cdg-footer-section</code>',
        description: 'Add style for tag <code>footer</code>.',
      },
      {
        name: '<code>reverse</code>',
        description: 'Add dark color style for tag <code>footer</code>.',
      },
      {
        name: '<code>primary</code>',
        description: 'Add primary color style for tag <code>footer</code>.',
      },
      {
        name: '<code>cdg-foot-logo-row</code>',
        description: 'Style for row has logo(flex & center).',
      },
      {
        name: '<code>cdg-footer-nav</code>',
        description: 'Style for row has related links.',
      },
      {
        name: '<code>cdg-footer-connect</code>',
        description:
          'Style for row has infomations(address, social media,...).',
      },
      {
        name: '<code>cdg-footer</code>',
        description: 'Information about rights and copyrights.',
      },
    ]
  }
}
