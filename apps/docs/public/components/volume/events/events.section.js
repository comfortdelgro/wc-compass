import {CdgBaseDocsComponent} from '../../../shared/base-component'

export class CdgVolumeEventsSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Events</h3>
    <table id="eventsTable" is="cdg-table"></table>
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
