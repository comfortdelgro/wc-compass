import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDropdownOptPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods for <code>cdg-dropdown</code></h3>
  
    <cdg-table id="dropdownOptPropertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#dropdownOptPropertiesTable')
    table.data = [
      {
        name: 'value',
        type: '<code>any</code>',
        default: '',
        description: 'The value of option.',
      },
      {
        name: 'selected',
        type: '<code>boolean</code>',
        default: 'false',
        description: 'The currently selected option.',
      },
      {
        name: '<code>[displaySelect]</code>',
        type: '<code>boolean</code>',
        default: 'false',
        description:
          'To display the desired item, add <code>[displaySelect]</code>.',
      },
    ]
  }
}
