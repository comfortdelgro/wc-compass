import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgFileUploadPropertiesSection extends CdgBaseComponent {
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
        name: 'fileName',
        type: '<code>string</code>',
        default: '',
        description: 'Text display at the first.',
      },
      {
        name: 'state',
        type: `<code>uploading</code> |
        <code>success</code> |
        <code>error</code> |
        <code>close</code> |
        <code>downloadable</code>`,
        default: '',
        description: 'Types of icon display at the last.',
      },
    ]
  }
}
