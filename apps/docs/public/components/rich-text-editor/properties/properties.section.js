import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgRTEPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods</h3>
    <h4 class="sample-section-title">Editor</h4>
    <cdg-table id="propertiesTable"></cdg-table><br/>
    <h4 class="sample-section-title">Toolbar</h4>
    <cdg-table id="toolbarPropertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    const toolbarTable = document.querySelector('#toolbarPropertiesTable')
    table.data = [
      {
        name: 'resizable',
        type: '<code>property</code>',
        default: '',
        description: 'To resize the editor vertically.',
      },
    ]
    toolbarTable.data = [
      {
        name: 'hiddenItems',
        type: '<code>property</code>',
        default: '',
        description:
          'To hide toolbar items into a hidden toolbar which can be shown via the toggle button.',
      },
    ]
  }
}
