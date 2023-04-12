import {CdgBaseComponent} from '../../../shared/base-component'
import {dummyData} from '../table-data'
import template from './options.section.html'

export class CdgTableOptionsSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleTable')
    table.checkable = true
    table.options = {
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
    table.data = dummyData.slice(0, 10)
  }
}
