import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgRTEEventsSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Events</h3>
    <cdg-table id="eventsTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#eventsTable')
    table.data = [
      {
        name: '<code>onRichTextEditorUpdate</code>',
        output: '<code>CustomEvent</code>',
        description: '<code>event.detail</code>: <code>string</code>',
      },
    ]
  }
}
