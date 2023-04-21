import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRangeSliderEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
      {
        name: '<code>change</code>',
        type: '<code>CustomEvent</code>',
        description: '<code>event.detail.value</code>',
      },
    ]
  }
}
