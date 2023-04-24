import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgFilePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'allow-drop',
        type: '<code>boolean</code>',
        default: '',
        description: 'Allow user drag file to input',
      },
      {
        name: 'vertical',
        type: '<code>boolean</code>',
        default: '',
        description: 'Using vertical layout.',
      },
    ]
  }
}
