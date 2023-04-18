import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgPopoverPropertiesSection extends CdgBaseComponent {
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
        name: 'direction',
        type: `<code>'topLeft'</code>
  | <code>'top'</code>
  | <code>'topRight'</code>
  | <code>'leftTop'</code>
  | <code>'left'</code>
  | <code>'leftBottom'</code>
  | <code>'rightTop'</code>
  | <code>'rightBottom'</code>
  | <code>'right'</code>
  | <code>'bottomLeft'</code>
  | <code>'bottom'</code>
  | <code>'bottomRight'</code>`,
        default: '<code>bottom</code>',
        description: 'The direction of Popover',
      },
      {
        name: 'open',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Popover's open/closed state.",
      },
    ]
  }
}
