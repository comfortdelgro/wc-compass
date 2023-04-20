import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDatePickerPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'start-date',
        type: '<code>string</code>',
        default: '',
        description: 'The first selected date of a range of dates',
      },
      {
        name: 'end-date',
        type: '<code>string</code>',
        default: '',
        description: 'The last selected date of a range of dates',
      },
      {
        name: 'format',
        type: '<code>string</code>',
        default: '<code>YYYY-MM-DD</code>',
        description: 'The display format of the calendar.',
      },
      {
        name: 'min',
        type: '<code>string</code>',
        default: '',
        description: 'The smallest date that can be selected.',
      },
      {
        name: 'max',
        type: '<code>string</code>',
        default: '',
        description: 'The biggest date that can be selected.',
      },
      {
        name: 'double',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Showing 2 months on calendar.',
      },
      {
        name: 'disabled',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether the element is disabled.',
      },
    ]
  }
}
