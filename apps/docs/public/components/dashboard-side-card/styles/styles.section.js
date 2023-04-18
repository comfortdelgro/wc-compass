import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgDashboardSideCardStylesSection extends CdgBaseComponent {
  constructor() {
    super()
    this.htmlContent = `<section class="guideline-section">
    <h3 class="sample-section-title">CSS class name</h3>
    <cdg-table id="styleTable"></cdg-table>
  </section>
    `
  }

  onInit() {
    const table = document.querySelector('#styleTable')

    table.options = {
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

    table.data = [
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
