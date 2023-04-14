import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgButtonPropertiesSection extends CdgBaseComponent {
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
    table.options = PROPERTIES_TABLE_OPTIONS

    table.data = [
      {
        name: 'size',
        type: "<code>'' | primary | danger | secondary | ghost</code>",
        default: "<code>''</code>",
        description: 'Style of the button',
      },
      {
        name: 'disabled',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To disable the button',
      },
    ]
  }
}
