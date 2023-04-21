import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgQuantityToggleEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
      {
        name: '<code>change</code>',
        type: '<code>Event</code>',
        description: '<code>input.value</code> to get the value',
      },
      {
        name: '<code>validChange</code>',
        type: '<code>CustomEvent</code>',
        description: '<code>event.detail</code> error message',
      },
    ]
  }
}
