import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgTableEventsSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">Events</h3>
    <cdg-table id="eventsTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#eventsTable')
    table.data = [
      {
        name: '<code>selectionChange</code>',
        type: '<code>TableSelectionEvent</code>',
        default: '',
        description:
          'When user has selected / unselected: <code>isCheckAll: boolean</code>, <code>hasCheckedRow: boolean</code>, <code>selected: []</code>',
      },
      {
        name: '<code>sort</code>',
        type: '<code>TableSortEvent</code>',
        default: '',
        description:
          'When has clicked on column title to sort: <code>fieldName: string</code>, <code>sortDirection: 1 | -1</code>',
      },
    ]
  }
}
