import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgLoadingPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'size',
        type: '<code>large</code> | <code>medium</code> | <code>small</code>',
        default: '',
        description: 'Size of loading icon',
      },
      {
        name: 'text',
        type: '<code>string</code>',
        default: '',
        description: 'Text is displayed below icon.',
      },
    ]
  }
}
