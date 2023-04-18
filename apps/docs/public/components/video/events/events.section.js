import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgVideoEventsSection extends CdgBaseComponent {
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
        name: '<code>navigate</code>',
        output: '<code>CustomEvent</code>',
        description:
          '<code>event.detail</code>: <code>next</code> | <code>previous</code>',
      },
      {
        name: '<code>play</code>',
        output: '<code>CustomEvent</code>',
        description:
          '<code>event.detail</code>: <code>playing</code> | <code>paused</code>',
      },
    ]
  }
}
