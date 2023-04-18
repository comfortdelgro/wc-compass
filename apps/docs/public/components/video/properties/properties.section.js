import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgVideoPropertiesSection extends CdgBaseComponent {
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
        name: 'controls',
        type: '<code>property</code>',
        default: '',
        description: 'To display video controls',
      },
      {
        name: 'volume',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current volume percentage from 0 to 100.',
      },
    ]
  }
}
