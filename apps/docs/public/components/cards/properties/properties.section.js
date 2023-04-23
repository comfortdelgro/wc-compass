import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCardsPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: 'horizontal',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether Card is horizontal.',
      },
      {
        name: 'transparent',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether Card is transparent background.',
      },
      {
        name: 'disabled',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether Card is disabled.',
      },
    ]
  }
}
