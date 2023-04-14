import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDropdownColorPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods for <code>cdg-dropdown</code></h3>
  
    <cdg-table id="selectColorPropertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#selectColorPropertiesTable')
    table.data = [
      {
        name: 'colors',
        type: '<code>string</code>',
        default: '',
        description: `
        Color code list.
        <br>
        <strong>Sample</strong>
        <br>
        <code>colors="#212529,#845EF7,#339AF0"</code>
        `,
      },
    ]
  }
}
