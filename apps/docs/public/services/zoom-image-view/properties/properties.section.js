import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgImageViewerPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: '<code>src</code>',
        type: '<code>url</code>',
        description: 'Image link',
      },
      {
        name: '<code>largeSrc</code>',
        type: '<code>url</code>',
        description: 'Link of larger image',
      },
    ]
  }
}
