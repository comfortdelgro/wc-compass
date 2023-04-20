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
        type: 'property',
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
        name: '<code>options.onRowClick</code>',
        type: '<code>void</code>',
        default: '',
        description: 'callback function when user click on a single row.',
      },
    ]
  }
}
