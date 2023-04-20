import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgProgressPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>percentage</code>',
        type: '<code>number</code>',
        default: '<code>indeterminate</code>',
        description:
          'Value of percentage from <code>0</code> to <code>100</code>. If you leave it without percentage, it will displays as indeterminate mode',
      },
      {
        name: '<code>size</code>',
        type: "<code>''</code> | <code>medium</code> | <code>large</code> | <code>xlarge</code>",
        default: "<code>''</code>",
        description: 'To show progress bar smaller or larger.',
      },
      {
        name: '<code>rounded</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description: 'To round the progress corners.',
      },
      {
        name: '<code>color</code>',
        type: 'Color string. Ex: <code>color="#107c10"</code>',
        default: "<code>''</code>",
        description: 'To set the color of current percentage bar.',
      },
    ]
  }
}
