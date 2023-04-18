import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgWizardsPropertiesSection extends CdgBaseComponent {
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
        name: 'steps',
        type: '<code>string</code>',
        default: "<code>''</code>",
        description:
          'List of steps splited by comma. Ex: General,Additional,Education,Personal,Review',
      },
      {
        name: 'current',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current step. Set it to any other step to move the step.',
      },
    ]
  }
}
