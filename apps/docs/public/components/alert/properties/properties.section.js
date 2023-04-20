import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgAlertPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'align',
        type: '<code>center</code>',
        default: '',
        description: "Align Alert's content position.",
      },
      {
        name: 'type',
        type: '<code>info</code> | <code>success</code> | <code>error</code> | <code>caution</code>',
        default: '',
        description: "Alert's display styles.",
      },
    ]
  }
}
