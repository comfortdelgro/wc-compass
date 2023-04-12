import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgListviewPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods</h3>
  
    <cdg-info-table id="propertiesTable"></cdg-info-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.options = PROPERTIES_TABLE_OPTIONS

    table.data = [
      {
        name: '<code>allow-drag</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To allow user to drag items.',
      },
    ]
  }
}
