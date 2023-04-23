import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRichTextEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
      {
        name: '<code>onRichTextEditorUpdate</code>',
        output: '<code>CustomEvent</code>',
        description: '<code>event.detail</code>: <code>string</code>',
      },
    ]
  }
}
