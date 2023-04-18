import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgLazyLoadImagePropertiesSection extends CdgBaseComponent {
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
        name: 'fallbackSrc',
        type: '<code>string</code>',
        default: '',
        description: 'If image fail to load and it will render fallbackSrc instead.',
      },
    ]
  }
}
