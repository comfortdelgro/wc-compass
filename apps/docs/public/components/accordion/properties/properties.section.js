import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgAccordionPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3>Props & Methods</h3>
  
    <cdg-info-table id="propertiesTable"></cdg-info-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.options = PROPERTIES_TABLE_OPTIONS

    table.data = [
      {
        name: 'opened',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, expands the accordion by default.</div>',
      },
    ]
  }
}
