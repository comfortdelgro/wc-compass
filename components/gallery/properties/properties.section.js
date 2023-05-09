import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgGalleryPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: '<code>data</code>',
        type: '<code>{alt: string, thumbnail: url, large: url}}[]</code>',
        description: 'List of image object',
      },
    ]
  }
}
