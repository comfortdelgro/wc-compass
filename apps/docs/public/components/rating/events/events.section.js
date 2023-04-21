import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRatingEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
      {
        name: '<code>rate</code>',
        type: '<code>CustomEvent</code>',
        description: '<code>event.detail.value</code>',
      },
    ]
  }
}
