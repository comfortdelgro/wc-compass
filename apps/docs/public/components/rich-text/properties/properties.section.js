import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRichTextPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: '<code>resizable</code>',
        type: '<code>property</code>',
        default: '',
        description: 'To let user resize the editor',
      },
      {
        name: '<code>&lt;cdg-rte-toolbar&gt;</code> <code>hiddenItems</code>',
        type: '<code>property</code>',
        default: '',
        description: 'To collapse and show buttons as one line',
      },
    ]
  }
}
