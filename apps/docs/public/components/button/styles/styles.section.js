import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgButtonStylesSection extends CdgTableComponentSection {
  constructor() {
    super('CSS class name')
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
        name: '<code>cdg-button</code>',
        description: 'To use comfortdelgro button styles.',
      },
      {
        name: "<code>''</code>",
        description: 'Default button will be displayed as primary style.',
      },
      {
        name: '<code>primary</code>',
        description:
          'Primary style of the button with blue background, white color.',
      },
      {
        name: '<code>secondary</code>',
        description:
          'Secondary style of the button with blue border, blue color.',
      },
      {
        name: '<code>danger</code>',
        description: 'Danger style of the button with red border, red color.',
      },
      {
        name: '<code>ghost</code>',
        description:
          'Ghost style of the button without background but still claim the space.',
      },
      {
        name: '<code>icon</code>',
        description:
          'Button will display as square button with only icon inside.',
      },
      {
        name: '<code>link</code>',
        description:
          'Button will display as link without background, padding around.',
      },
    ]
  }
}
