import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgForloopPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        Name: 'for',
        type: 'string',
        description: `Number of for loop times
        `,
      },
      {
        Name: 'items',
        type: 'array',
        description: `Array to pass into for loop item
        `,
      },
    ]
  }
}
