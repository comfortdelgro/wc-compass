import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgFooterStylesSection extends CdgBaseComponent {
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
        name: '<code>cdg-footer-section</code>',
        description: 'Add style for tag <code>footer</code>.',
      },
      {
        name: '<code>reverse</code>',
        description: 'Add dark color style for tag <code>footer</code>.',
      },
      {
        name: '<code>primary</code>',
        description: 'Add primary color style for tag <code>footer</code>.',
      },
      {
        name: '<code>cdg-foot-logo-row</code>',
        description: 'Style for row has logo(flex & center).',
      },
      {
        name: '<code>cdg-footer-nav</code>',
        description: 'Style for row has related links.',
      },
      {
        name: '<code>cdg-footer-connect</code>',
        description: 'Style for row has infomations(address, social media,...).',
      },
      {
        name: '<code>cdg-footer</code>',
        description: 'Information about rights and copyrights.',
      },
    ]
  }
}
