import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDatePickerPropertiesSection extends CdgBaseComponent {
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
    table.data = [
      {
        name: 'start-date',
        type: '<code>string</code>',
        default: '',
        description: 'The first selected date of a range of dates',
      },
      {
        name: 'end-date',
        type: '<code>string</code>',
        default: '',
        description: 'The last selected date of a range of dates',
      },
      {
        name: 'format',
        type: '<code>string</code>',
        default: '<code>YYYY-MM-DD</code>',
        description: 'The display format of the calendar.',
      },
      {
        name: 'min',
        type: '<code>string</code>',
        default: '',
        description: 'The smallest date that can be selected.',
      },
      {
        name: 'max',
        type: '<code>string</code>',
        default: '',
        description: 'The biggest date that can be selected.',
      },
      {
        name: 'double',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Showing 2 months on calendar.',
      },
      {
        name: 'disabled',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Whether the element is disabled.',
      },
    ]
  }
}
