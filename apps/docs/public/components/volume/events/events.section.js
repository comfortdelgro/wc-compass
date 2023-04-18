import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgVolumeEventsSection extends CdgBaseComponent {
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
        name: '<code>volumechange</code>',
        output: '<code>CustomEvent</code>',
        description: 'event.detail: number of current volume',
      },
      {
        name: '<code>mute</code>',
        output: '<code>CustomEvent</code>',
        description: 'event.detail: boolean muted or unmuted',
      },
    ]
  }
}
