import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgLazyLoadImagePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>fallbackSrc</code>',
        type: '<code>string</code>',
        default: '',
        description:
          'If image fail to load and it will render fallbackSrc instead.',
      },
      {
        name: '<code>use-viewer</code>',
        type: '<code>property</code>',
        default: '',
        description:
          'Allow user to click to enlarge the image for a larger view.',
      },
    ]
  }
}
