import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgGutterPropertiesSection extends CdgBaseComponent {
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
    table.options = PROPERTIES_TABLE_OPTIONS

    table.data = [
      {
        name: '<code>place</code>',
        type: '<code>left</code> | <code>right</code>',
        default: '<code>right</code>',
        description: "The side that you want to resize of it's parent.",
      },
      {
        name: '<code>use-collapse</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To display quick collapse icon button on top of gutter.',
      },
    ]
  }
}
