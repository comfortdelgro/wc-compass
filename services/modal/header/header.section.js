import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgModalHeaderPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods <code>cdg-modal-header</code></h3>
  
    <table id="headerPropertiesTable" is="cdg-table"></table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#headerPropertiesTable')
    table.data = [
      {
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: 'Size of modal.',
      },
      {
        name: 'use-close-cutton',
        type: '<code>boolean</code>',
        default: '<code>true</code>',
        description: 'Show/hide close button on header.',
      },
    ]
  }
}
