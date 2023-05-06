import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgInlineImageViewerPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: 'src',
        type: '<code>url</code>',
        default: '',
        description: 'The image link.',
      },
    ]
  }
}
