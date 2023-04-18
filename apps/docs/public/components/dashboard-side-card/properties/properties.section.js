import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDashboardSideCardPropertiesSection extends CdgBaseComponent {
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
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: 'The title display on <code>cdg-dashboard-side-card</code>.',
      },
    ]
  }
}
