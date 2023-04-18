import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgIconPropertiesSection extends CdgBaseComponent {
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
        name: 'name',
        type: '<code>string</code>',
        default: '',
        description: 'Name of icon(list of names are above).',
      },
      {
        name: 'size',
        type: '<code>number</code>',
        default: '<code>24</code>',
        description: 'Size(width & height) of icon.',
      },
    ]
  }
}
