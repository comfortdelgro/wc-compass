import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgAccordionPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'opened',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, expands the accordion by default.</div>',
      },
    ]
  }
}
