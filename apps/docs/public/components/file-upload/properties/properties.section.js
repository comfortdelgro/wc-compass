import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgFileUploadPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'fileName',
        type: '<code>string</code>',
        default: '',
        description: 'Text display at the first.',
      },
      {
        name: 'state',
        type: `<code>uploading</code> |
        <code>success</code> |
        <code>error</code> |
        <code>close</code> |
        <code>downloadable</code>`,
        default: '',
        description: 'Types of icon display at the last.',
      },
    ]
  }
}
