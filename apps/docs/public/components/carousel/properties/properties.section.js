import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCarouselPropertiesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3>Props & Methods</h3>
  
    <cdg-info-table id="propertiesTable"></cdg-info-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#propertiesTable')
    table.options = PROPERTIES_TABLE_OPTIONS

    table.data = [
      {
        name: 'current',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current active index.',
      },
      {
        name: 'use-arrow',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Using button next/prev as an arrow.',
      },
      {
        name: 'auto-switch',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, the slide will automatically switch.</div>',
      },
      {
        name: 'single-center',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, the first item will be centered.</div>',
      },
      {
        name: 'onCurrentChange',
        type: '<code>event</code>',
        default: '',
        description: 'Emits when the current index is changed.',
      },
    ]
  }
}
