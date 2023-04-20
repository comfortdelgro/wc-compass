import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgModalPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'size',
        type: '<code>large</code> | <code>medium</code> | <code>small</code> | <code>auto</code>',
        default: '<code>small</code>',
        description: 'Size of modal.',
      },
    ]
  }
}
