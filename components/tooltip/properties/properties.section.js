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
        name: 'trigger',
        type: '<code>hover</code> | <code>click</code> | <code>focus</code>',
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
      {
        name: 'hide-arrow',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          'Whether the element should have an arrow pointed to anchor element',
      },
      {
        name: 'hide-close-button',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          'Whether the element should have an close button at the right',
      },
      {
        name: 'open-delay',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'The delay time for the tooltip to show up',
      },
      {
        name: 'close-delay',
        type: '<code>number</code>',
        default: '<code>0</code>',
        description: 'The delay time for the tooltip to close',
      },
      {
        name: 'disable-interactive',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: `Tooltips are interactive by default (to pass WCAG 2.1 success criterion 1.4.13).
        It won't close when the user hovers over the tooltip.
        You can disable this behavior (thus failing the success criterion which is required to reach level AA)`,
      },
    ]
  }
}
