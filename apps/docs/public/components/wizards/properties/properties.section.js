import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgWizardsPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'steps',
        type: '<code>string</code>',
        default: "<code>''</code>",
        description:
          'List of steps splited by comma. Ex: General,Additional,Education,Personal,Review',
      },
      {
        name: 'current',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'Current step. Set it to any other step to move the step.',
      },
    ]
  }
}
