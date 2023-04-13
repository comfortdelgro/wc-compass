import {CdgBaseComponent} from '../../../shared/base-component'
import {dummyData} from '../table-data'
import template from './options.section.html'

export class CdgTableOptionsSection extends CdgBaseComponent {
  checkable = false

  table
  toolbar

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.fillInData()
    this.listenEvents()
  }

  fillInData() {
    this.table = this.querySelector('#sampleTable')
    this.table.checkable = false
    this.table.options = {
      columns: [
        {
          name: 'ID',
          width: '80px',
          fieldName: 'id',
        },
        {
          name: 'Name',
          width: 'auto',
          fieldName: 'name',
          sortable: true,
        },
        {
          name: 'Age',
          width: '80px',
          fieldName: 'age',
          sortable: true,
        },
        {
          name: 'Sex',
          width: '140px',
          fieldName: 'gender',
        },
      ],
    }
    this.table.data = dummyData.slice(0, 10)
    this.table.addEventListener(
      'selectionChange',
      this.handleSelectionChange.bind(this),
    )
  }

  listenEvents() {
    this.toolbar = this.querySelector('.cdg-toolbar')
    const button = this.querySelector('#selectButton')
    button.addEventListener('click', this.toggleCheckable.bind(this))
  }

  toggleCheckable(event) {
    this.checkable = !this.checkable
    this.table.checkable = this.checkable
    event.target.textContent = this.checkable ? 'Cancel' : 'Select'
  }

  handleSelectionChange(event) {
    if (event.detail.hasCheckedRow) {
      this.toolbar.classList.add('selected')
    } else {
      this.toolbar.classList.remove('selected')
    }
  }
}
