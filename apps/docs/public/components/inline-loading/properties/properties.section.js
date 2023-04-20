import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgInlineLoadingPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'size',
        type: '<code>string</code>',
        default: '<code>large</code> | <code>small</code>',
        description: 'the first selected date of a range of dates',
      },
    ]
  }
}
