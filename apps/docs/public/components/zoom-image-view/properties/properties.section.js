import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgImageViewerPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super()
    this.data = [
      {
        name: 'multiple',
        type: '<code>boolean</code>',
        default: 'false',
        description: 'Set the image viewer with multiple images.',
      },
    ]
  }
}
