import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCardCoverPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props: cdg-card-cover')
    this.data = [
      {
        name: 'rounded',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether the Cover shape is rounded.',
      },
      {
        name: 'square',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether the Cover shape is square.',
      },
    ]
  }
}
