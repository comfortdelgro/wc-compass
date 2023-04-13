import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgProgressPropertiesSection extends CdgBaseComponent {
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
        name: '<code>percentage</code>',
        type: '<code>number</code>',
        default: '<code>indeterminate</code>',
        description:
          'Value of percentage from <code>0</code> to <code>100</code>. If you leave it without percentage, it will displays as indeterminate mode',
      },
      {
        name: '<code>size</code>',
        type: "<code>''</code> | <code>medium</code> | <code>large</code> | <code>xlarge</code>",
        default: "<code>''</code>",
        description: 'To show progress bar smaller or larger.',
      },
      {
        name: '<code>rounded</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To round the progress corners.',
      },
      {
        name: '<code>color</code>',
        type: 'Color string. Ex: <code>color="#107c10"</code>',
        default: "<code>''</code>",
        description: 'To set the color of current percentage bar.',
      },
    ]
  }
}
