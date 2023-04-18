import {CdgBaseComponent} from '../../../shared/base-component'

export class CdgCardBlogStylesSection extends CdgBaseComponent {
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
        name: '<code>cdg-card-grid</code>',
        description: 'Add to container of cards.',
      },
      {
        name: '<code>columns-4</code>',
        description:
          'Add to container of cards to change to 4 columns(default: 3 columns).',
      },
      {
        name: '<code>cdg-card-blog-content</code>',
        description: 'Wrap content of article.',
      },
      {
        name: '<code>cdg-card-blog-category</code>',
        description: 'Category of article .',
      },
      {
        name: '<code>cdg-card-blog-title</code>',
        description: 'Title of article.',
      },
      {
        name: '<code>cdg-card-blog-date</code>',
        description: 'Post date of article.',
      },
    ]
  }
}
