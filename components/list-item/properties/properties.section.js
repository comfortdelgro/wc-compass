import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgListItemPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>disabled</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To disable list item.',
      },
      {
        name: '<code>allow-drag</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To allow user to drag the item.',
      },
    ]
  }
}
