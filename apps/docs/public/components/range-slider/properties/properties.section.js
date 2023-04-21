import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRangeSliderPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>min</code>',
        type: '<code>number</code>',
        default: '',
        description: 'Min value of slider',
      },
      {
        name: '<code>max</code>',
        type: '<code>number</code>',
        default: '',
        description: 'Max value of slider',
      },
      {
        name: '<code>value</code>',
        type: '<code>number</code>',
        default: '',
        description: 'Current value of slider',
      },
      {
        name: '<code>step</code>',
        type: '<code>number</code>',
        default: '',
        description: 'Ammount of step jump',
      },
    ]
  }
}
