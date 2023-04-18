import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgModalPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods <code>cdg-modal</code></h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
      {
        name: 'size',
        type: '<code>large</code> | <code>medium</code> | <code>small</code> | <code>auto</code>',
        default: '<code>small</code>',
        description: 'Size of modal.',
      },
    ]
  }
}
