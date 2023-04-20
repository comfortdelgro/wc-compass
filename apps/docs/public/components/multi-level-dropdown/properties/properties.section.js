import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgMultiLevelDropdownPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'event',
        type: '<code>"click"</code> | <code>"hover"</code>',
        default: '<code>click</code>',
        description: 'The first selected date of a range of dates',
      },
    ]
  }
}
