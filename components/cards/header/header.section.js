import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCardHeaderPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props: cdg-card-header')
    this.data = [
      {
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: 'The title of card.',
      },
    ]
  }
}
