import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgTooltipPropertiesSection extends CdgTableComponentSection {
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
        default: '<code>top</code>',
        description: 'The direction of Tooltip.',
      },
      {
        name: 'title',
        type: '<code>string</code>',
        default: '',
        description: 'The title display on Tooltip.',
      },
      {
        name: 'event',
        type: '<code>click</code> | <code>hover</code>',
        default: '<code>hover</code>',
        description: 'Event to trigger showing Tooltip.',
      },
      {
        name: 'type',
        type: '<code>primary</code> | <code>secondary</code> | <code>ghost</code>',
        default: '<code>primary</code>',
        description: 'Display Style for Tooltip.',
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
