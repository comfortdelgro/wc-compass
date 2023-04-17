import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDropdownPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Props & Methods for <code>cdg-dropdown</code></h3>
  
    <cdg-table id="propertiesTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.data = [
      {
        name: 'placeholder',
        type: '<code>string</code>',
        default: '',
        description: 'The placeholder text of the dropdown.',
      },
      {
        name: 'multiple',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Set the dropdown to multiple selection.',
      },
      {
        name: 'is-loading',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Hide all items and show loading.',
      },
      {
        name: 'disabled',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether the element is disabled.',
      },
      {
        name: 'onchangevalue',
        type: '<code>function</code><pre>',
        default: '',
        description: `Event emitted when the selected value has been changed by the user.
          <br>
          <b>Signature:</b>
          <br>
          <code>function(event: { detail: string | string[] }) => void</code>`,
      },
      {
        name: 'onToggle',
        type: '<code>function</code>',
        default: '',
        description: `Event emitted when the dropdown has been toggled.
          <br>
          <b>Signature:</b>
          <br>
          <code>function(event: { detail: boolean }) => void</code>`,
      },
    ]
  }
}
