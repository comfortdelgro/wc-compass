import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgImageViewerPropertiesSection extends CdgBaseComponent {
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
        name: 'multiple',
        type: '<code>boolean</code>',
        default: 'false',
        description: 'Set the image viewer with multiple images.',
      },
    ]
  }
}
