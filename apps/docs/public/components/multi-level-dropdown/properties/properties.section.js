import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgMultiLevelDropdownPropertiesSection extends CdgBaseComponent {
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
        name: 'event',
        type: '<code>"click"</code> | <code>"hover"</code>',
        default: '<code>click</code>',
        description: 'The first selected date of a range of dates',
      },
    ]
  }
}
