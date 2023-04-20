import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDashboardSideCardPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: 'The title display on <code>cdg-dashboard-side-card</code>.',
      },
    ]
  }
}
