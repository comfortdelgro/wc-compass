import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgTablePropertiesSection extends CdgTableComponentSection {
  constructor() {
    super('Props')
    this.data = [
      {
        name: '<code>checkable</code>',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description:
          '<div>If <code>true</code>, checkboxes column will displays.</div>',
      },
      {
        name: '<code>data</code>',
        type: '<code>Object[]</code>',
        default: '<code>[]</code>',
        description:
          'Array of the data. Without columns options, the table will display the whole properties as column name',
      },
      {
        name: '<code>options</code>',
        type: '<code>TableOptions</code>',
        default: '',
        description:
          'Options of the table includes column options and row click callback function.',
      },
      {
        name: '<code>options.headClass</code>',
        type: '<code>string</code>',
        default: '<code>[]</code>',
        description: 'Set class name for the table head',
      },
      {
        name: '<code>options.bodyClass</code>',
        type: '<code>string</code>',
        default: '<code>[]</code>',
        description: 'Set class name for the table body',
      },
      {
        name: '<code>options.columns</code>',
        type: '<code>TableColumnOption[]</code>',
        default: '',
        description: 'Column options',
      },
      {
        name: '<code>column.name</code>',
        type: '<code>string</code>',
        default: '',
        description: 'Column name that display on the table header',
      },
      {
        name: '<code>column.width</code>',
        type: '<code>px</code> | <code>%</code> | <code>auto</code>',
        default: '',
        description: 'Column size, if empty column width will be auto.',
      },
      {
        name: '<code>column.align</code>',
        type: '<code>left</code> | <code>center</code> | <code>right</code>',
        default: '',
        description: 'Text alignment of the column cells.',
      },
      {
        name: '<code>column.fieldName</code>',
        type: '<code>string</code>',
        default: '',
        description: 'To map with data table',
      },
      {
        name: '<code>column.sortable</code>',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'To allow user to sort the table',
      },
      {
        name: '<code>column.sortDirection</code>',
        type: '<code>number</code>',
        default: '<code>null</code>',
        description: '<code>1</code> desc | <code>-1</code> asc',
      },
      {
        name: '<code>column.editable</code>',
        type: '<code>boolean</code>',
        default: '<code>false</code>',
        description: 'Allow user input inside table with <code>column.colummTemplate</code>',
      },
      {
        name: '<code>column.colummTemplate</code>',
        type: '<code>HTMLElement</code>',
        default: '<code>null</code>',
        description: 'Display element for user input data.',
      },
      {
        name: '<code>column.rowspan</code>',
        type: '<code>number</code>',
        default: '<code>1</code>',
        description: 'Use to merge table row.',
      },
      {
        name: '<code>column.colspan</code>',
        type: '<code>number</code>',
        default: '<code>1</code>',
        description: 'Use to merge table cell.',
      },
      {
        name: '<code>column.table</code>',
        type: '<code>TableOptions</code>',
        default: '',
        description: 'Use to create a table inside table.',
      },
      {
        name: '<code>column.columns</code>',
        type: '<code>TableColumnOption[]</code>',
        default: '',
        description: 'Use to create a table inside table.',
      },
      {
        name: '<code>options.onRowClick</code>',
        type: '<code>function</code>',
        default: '',
        description: 'callback function when user click on a single row.',
      },
      {
        name: '<code>options.onRowChange</code>',
        type: '<code>function</code>',
        default: '',
        description: 'callback function after user changes data in a row.',
      },
    ]
  }
}
