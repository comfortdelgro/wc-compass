import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgLazyLoadImagePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'fallbackSrc',
        type: '<code>string</code>',
        default: '',
        description: 'If image fail to load and it will render fallbackSrc instead.',
      },
    ]
  }
}
