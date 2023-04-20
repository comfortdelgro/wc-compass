import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgToolbarPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'raised',
        type: '<code>property</code>',
        default: '',
        description: 'To let the toolbar have padding, box shadow.',
      },
    ]
  }
}
