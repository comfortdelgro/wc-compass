import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgRatingPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>use-icon</code>',
        type: '<code>property</code>',
        default: '',
        description: 'To use rating icon instead of number',
      },
    ]
  }
}
