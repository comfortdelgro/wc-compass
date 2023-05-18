import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgTimePickerPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: '<code>value</code>',
        type: '<code>string</code>',
        default: '',
        description:
          'Set default value for input(format: hh:mm PM/AM).',
      },
      {
        name: '<code>placeholder</code>',
        type: '<code>string</code>',
        default: '<code>HH:MM AA</code>',
        description:
          'Specifies a short hint that describes the expected value.',
      },
      {
        name: '<code>minute-step</code>',
        type: '<code>number</code>',
        default: '<code>1</code>',
        description:
          'Minute column spacing setting.',
      },
      {
        name: '<code>onTimeClick</code>',
        type: '<code>function</code>',
        default: '',
        description: `Event emitted when the click an item by the user.
          <br>
          <b>Signature:</b>
          <br>
          <code>function(event: { detail: {hour: string, minute: string, time: string, displayValue: string} }) => void</code>`,
      },
    ]
  }
}
