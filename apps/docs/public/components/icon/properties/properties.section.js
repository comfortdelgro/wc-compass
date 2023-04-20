import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgIconPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'name',
        type: '<code>string</code>',
        default: '',
        description: 'Name of icon(list of names are above).',
      },
      {
        name: 'size',
        type: '<code>number</code>',
        default: '<code>24</code>',
        description: 'Size(width & height) of icon.',
      },
    ]
  }
}
