import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgAvatarPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: '<code>size</code>',
        type: '<code>number</code>',
        default: '<code>24</code>',
        description: 'Size of avatar by pixel.',
      },
      {
        name: '<code>name</code>',
        type: '<code>string</code>',
        default: "<code>''</code>",
        description:
          'Without image link, you must provide the name then component will displays the first character on avatar automatically.',
      },
      {
        name: '<code>useFullName</code>',
        type: '<code>property</code>',
        default: "<code>''</code>",
        description:
          'In case we want to use customize string instead of auto cut off first characters.',
      },
      {
        name: '<code>type</code>',
        type: "<code>''</code> | <code>icon</code>",
        default: "<code>''</code>",
        description: 'To let icon displays center of the avatar.',
      },
      {
        name: '<code>alt</code>',
        type: '<code>string</code>',
        default: "<code>''</code>",
        description: 'To set as image alt caption with image mode.',
      },
    ]
  }
}
