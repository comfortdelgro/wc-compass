import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgOtpPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'name',
        type: '<code>string</code>',
        default: '',
        description: `The name of the context-menu.
        <br>
        <strong>Note</strong>: The names of the context-menu must be different`,
      },
      {
        name: '<code>[contextMenuToggle]</code>',
        type: '<code>boolean</code>',
        default: '',
        description: 'Add to item when right-clicking will toggle Content',
      },
      {
        name: '<code>[contextMenuContent]</code>',
        type: '<code>boolean</code>',
        default: '',
        description: 'Define item as content.',
      },
      {
        name: 'onContextMenuOpen',
        type: '<code>function</code>',
        default: '',
        description: 'Define item as content.',
      },
    ]
  }

}
