import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgQuantityTogglePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>max</code>',
        type: '<code>number</code>',
        default: '',
        description: 'To limit largest value can be inputed',
      },
      {
        name: '<code>min</code>',
        type: '<code>number</code>',
        default: '',
        description: 'To limit smallest value can be inputed',
      },
      {
        name: '<code>step</code>',
        type: '<code>number</code>',
        default: '',
        description: 'Number of increasement or decreasement in every step',
      },
      {
        name: '<code>disabled</code>',
        type: '<code>property</code>',
        default: '',
        description: 'To not allow user to interact with',
      },
    ]
  }
}
