import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgVolumePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'volume',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current volume percentage from 0 to 100.',
      },
    ]
  }
}
