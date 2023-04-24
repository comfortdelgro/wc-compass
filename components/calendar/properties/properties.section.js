import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCalendarPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'start-date',
        type: '<code>string</code>',
        default: '',
        description: 'the first selected date of a range of dates',
      },
      {
        name: 'end-date',
        type: '<code>string</code>',
        default: '',
        description: 'the last selected date of a range of dates',
      },
      {
        name: 'format',
        type: '<code>string</code>',
        default: 'YYYY-MM-DD',
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
        default: '',
        description: 'Showing 2 months on calendar.',
      },
    ]
  }
}
