import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgAlertBadgesPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods</h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
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
