import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgSpeedDialPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>direction</code>',
        type: '<code>string</code>',
        default: 'This property is required',
        description: 'To define the position of action list',
      },
      {
        name: '<code>open</code>',
        type: '<code>property</code>',
        default: '',
        description: 'To show the action list',
      },
    ]
  }
}
