import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCardsPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods <code>cdg-card</code></h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
      {
        name: 'horizontal',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Whether Card is horizontal.",
      },
      {
        name: 'transparent',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Whether Card is transparent background.",
      },
      {
        name: 'disabled',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Whether Card is disabled.",
      },
    ]
  }
}
