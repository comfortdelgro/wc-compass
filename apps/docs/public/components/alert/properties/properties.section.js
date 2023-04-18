import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgAlertPropertiesSection extends CdgBaseComponent {
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
        name: 'align',
        type: '<code>center</code>',
        default: '',
        description: "Align Alert's content position.",
      },
      {
        name: 'type',
        type: '<code>info</code> | <code>success</code> | <code>error</code> | <code>caution</code>',
        default: '',
        description: "Alert's display styles.",
      },
    ]
  }
}
