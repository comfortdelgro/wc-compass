import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgVideoPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'controls',
        type: '<code>property</code>',
        default: '',
        description: 'To display video controls',
      },
      {
        name: 'volume',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current volume percentage from 0 to 100.',
      },
    ]
  }
}
