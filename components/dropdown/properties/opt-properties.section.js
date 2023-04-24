import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDropdownOptPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'value',
        type: '<code>any</code>',
        default: '',
        description: 'The value of option.',
      },
      {
        name: 'selected',
        type: '<code>boolean</code>',
        default: 'false',
        description: 'The currently selected option.',
      },
      {
        name: '<code>[displaySelect]</code>',
        type: '<code>boolean</code>',
        default: 'false',
        description:
          'To display the desired item, add <code>[displaySelect]</code>.',
      },
    ]
  }
}
