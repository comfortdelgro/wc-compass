import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgAlertBadgesPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'size',
        type: '<code>large</code>',
        default: '',
        description: 'The size of badge.',
      },
      {
        name: 'badge-style',
        type: '<code>dot</code> | <code>chart</code>',
        default: '',
        description: 'Display types of badge.',
      },
      {
        name: 'type',
        type: '<code>success</code> | <code>warning</code> | <code>danger</code>',
        default: '',
        description: 'Badge display styles.',
      },
    ]
  }
}
