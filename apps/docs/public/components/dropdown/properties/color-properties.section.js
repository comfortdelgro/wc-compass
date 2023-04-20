import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDropdownColorPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'colors',
        type: '<code>string</code>',
        default: '',
        description: `
        Color code list.
        <br>
        <strong>Sample</strong>
        <br>
        <code>colors="#212529,#845EF7,#339AF0"</code>
        `,
      },
    ]
  }
}
