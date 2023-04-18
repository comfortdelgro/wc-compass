import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgFileStylesSection extends CdgBaseComponent {
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
        name: '<code>upload-button</code>',
        description: 'Add to container of content except for <code>input file</code>.',
      },
      {
        name: '<code>cdg-file-input</code>',
        description: 'Add to <code>input file</code>.',
      },
    ]
  }
}
