import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCardStylesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">CSS class name</h3>
    <cdg-table id="styleTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#styleTable')

    table.options = {
      columns: [
        {
          name: 'Class Name',
          width: '30%',
          fieldName: 'name',
        },
        {
          name: 'Description',
          width: 'auto',
          fieldName: 'description',
        },
      ],
    }

    table.data = [
      {
        name: '<code>cdg-card</code>',
        description: "Apply card's styles for HTML element.",
      },
      {
        name: '<code>raised</code>',
        description: 'Add box-shadow to card.',
      },
    ]
  }
}
