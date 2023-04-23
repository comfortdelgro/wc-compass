import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgPopoverPropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props & Methods')
    this.data = [
      {
        name: 'direction',
        type: `<code>'topLeft'</code>
  | <code>'top'</code>
  | <code>'topRight'</code>
  | <code>'leftTop'</code>
  | <code>'left'</code>
  | <code>'leftBottom'</code>
  | <code>'rightTop'</code>
  | <code>'rightBottom'</code>
  | <code>'right'</code>
  | <code>'bottomLeft'</code>
  | <code>'bottom'</code>
  | <code>'bottomRight'</code>`,
        default: '<code>bottom</code>',
        description: 'The direction of Popover',
      },
      {
        name: 'open',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: "Popover's open/closed state.",
      },
    ]
  }
}
