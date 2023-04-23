import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgCarouselPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'current',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current active index.',
      },
      {
        name: 'use-arrow',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Using button next/prev as an arrow.',
      },
      {
        name: 'auto-switch',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, the slide will automatically switch.</div>',
      },
      {
        name: 'single-center',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, the first item will be centered.</div>',
      },
      {
        name: 'onCurrentChange',
        type: '<code>event</code>',
        default: '',
        description: 'Emits when the current index is changed.',
      },
    ]
  }
}
