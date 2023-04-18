import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgInlineLoadingPropertiesSection extends CdgBaseComponent {
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
        type: '<code>string</code>',
        default: '<code>large</code> | <code>small</code>',
        description: 'the first selected date of a range of dates',
      },
    ]
  }
}
