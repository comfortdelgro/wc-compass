import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgSpeedDialPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>position</code>',
        type: '<code>string</code>',
        default: 'up',
        description: 'To define the position of list action',
      },
      {
        name: '<code>actions</code>',
        type: '<code>string</code>',
        default: '[]',
        description: 'Pass a string array object',
      },
    ]
  }
}
