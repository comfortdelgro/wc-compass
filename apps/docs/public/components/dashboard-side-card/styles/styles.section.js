import {CdgTableComponentSection} from '../../../shared/table-component'

export class CdgDashboardSideCardStylesSection extends CdgTableComponentSection {
  constructor() {
    super('CSS Class Name')
    this.tableOptions = {
      columns: [
        {
          name: 'Class Name',
          width: '30%',
          fieldName: 'name',
        },
        {
          name: 'Description',
          width: 'auto',
          fieldName: 'description',
        },
      ],
    }
    this.data = [
      {
        name: '<code>activity-category</code>',
        description:
          'Short name of activity in content of <code>cdg-card-activity</code>.',
      },
      {
        name: '<code>activity-title</code>',
        description:
          'Title of activity in content of <code>cdg-card-activity</code>.',
      },
      {
        name: '<code>activity-description</code>',
        description:
          'Description of activity in content of <code>cdg-card-activity</code>.',
      },
      {
        name: '<code>side-card-actions</code>',
        description:
          'Actions in content of <code>cdg-dashboard-side-card</code>.',
      },
    ]
  }
}
