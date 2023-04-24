import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgGutterPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>place</code>',
        type: '<code>left</code> | <code>right</code>',
        default: '<code>right</code>',
        description: "The side that you want to resize of it's parent.",
      },
      {
        name: '<code>use-collapse</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To display quick collapse icon button on top of gutter.',
      },
    ]
  }
}
