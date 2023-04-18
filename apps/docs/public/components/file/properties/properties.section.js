import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgFilePropertiesSection extends CdgBaseComponent {
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
        name: 'allow-drop',
        type: '<code>boolean</code>',
        default: '',
        description: 'Allow user drag file to input',
      },
      {
        name: 'vertical',
        type: '<code>boolean</code>',
        default: '',
        description: 'Using vertical layout.',
      },
    ]
  }
}
