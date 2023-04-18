import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgLoadingPropertiesSection extends CdgBaseComponent {
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
        type: '<code>large</code> | <code>medium</code> | <code>small</code>',
        default: '',
        description: 'Size of loading icon',
      },
      {
        name: 'text',
        type: '<code>string</code>',
        default: '',
        description: 'Text is displayed below icon.',
      },
    ]
  }
}
