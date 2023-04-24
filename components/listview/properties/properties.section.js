import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgListviewPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>allow-drag</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To allow user to drag items.',
      },
    ]
  }
}
