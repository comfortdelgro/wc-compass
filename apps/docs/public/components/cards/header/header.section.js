import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCardHeaderPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods <code>cdg-card-header</code></h3>
  
    <cdg-table id="cardHeaderPropertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#cardHeaderPropertiesTable')
    table.data = [
      {
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: "The title of card.",
      },
    ]
  }
}
