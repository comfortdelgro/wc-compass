import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgTableEventsSection extends CdgTableComponentSection {
  constructor() {
    super('Events')
    this.data = [
      {
        name: '<code>selectionChange</code>',
        type: '<code>TableSelectionEvent</code>',
        description:
          'When user has selected / unselected: <code>isCheckAll: boolean</code>, <code>hasCheckedRow: boolean</code>, <code>selected: []</code>',
      },
      {
        name: '<code>sort</code>',
        type: '<code>TableSortEvent</code>',
        description:
          'When has clicked on column title to sort: <code>fieldName: string</code>, <code>sortDirection: 1 | -1</code>',
      },
    ]
  }
}
