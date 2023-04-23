import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgButtonPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'size',
        type: "<code>'' | primary | danger | secondary | ghost</code>",
        default: "<code>''</code>",
        description: 'Style of the button',
      },
      {
        name: 'disabled',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To disable the button',
      },
    ]
  }
}
