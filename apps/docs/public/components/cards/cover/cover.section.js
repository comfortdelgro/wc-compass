import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCardCoverPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods <code>cdg-card-cover</code></h3>
  
    <cdg-table id="cardCoverPropertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#cardCoverPropertiesTable')
    table.data = [
      {
        name: 'rounded',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Whether the Cover shape is rounded.",
      },
      {
        name: 'square',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Whether the Cover shape is square.",
      },
    ]
  }
}
