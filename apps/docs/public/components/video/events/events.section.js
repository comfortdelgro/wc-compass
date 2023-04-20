import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgVideoEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
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
