import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgContextMenuPropertiesSection extends CdgBaseComponent {
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
        name: 'name',
        type: '<code>string</code>',
        default: '',
        description: `The name of the context-menu.
        <br>
        <strong>Note</strong>: The names of the context-menu must be different`,
      },
      {
        name: '<code>[contextMenuToggle]</code>',
        type: '<code>boolean</code>',
        default: '',
        description: 'Add to item when right-clicking will toggle Content',
      },
      {
        name: '<code>[contextMenuContent]</code>',
        type: '<code>boolean</code>',
        default: '',
        description: 'Define item as content.',
      },
      {
        name: 'onContextMenuOpen',
        type: '<code>function</code>',
        default: '',
        description: 'Define item as content.',
      },
    ]
  }
}
