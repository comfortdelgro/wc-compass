import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgOtpPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>length</code>',
        type: '<code>number</code>',
        default: '',
        description: `Number of characters length / input fields`,
      },
      {
        name: '<code>type</code>',
        type: '<code>"" | text | number</code>',
        default: 'number',
        description: `use text to allow user to input string characters, or default will only accept number`,
      },
      {
        name: '<code>fieldinput</code>',
        type: '<code>CustomEvent</code>',
        default: '',
        description: `event.detail: {
          inputs: input fields,
          valid: boolean,
          originalEvent: event,
          target: specific changing field,
          value: current inputed value,
        },`,
      },
    ]
  }
}
