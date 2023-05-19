import {CdgBaseComponent} from '../../../shared/base-component'
import template from './editable.section.html'

export class CdgTableEditableSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }
  firstColumnTemplate
  thirdColumnTemplate
  editingColumn = {}
  onInit() {
    this.thirdColumnTemplate = document.getElementById('description')
    this.secondColumnTemplate = document.getElementById('age')
    this.thirdColumnTemplate.style.display = 'none'
    this.secondColumnTemplate.style.display = 'none'
    const table = this.querySelector('#sampleEditableTable')
    table.options = {
      columns: [
        {
          name: 'Gender',
          width: 'auto',
          fieldName: 'gender',
        },
        {
          name: 'Age',
          width: 'auto',
          fieldName: 'age',
          colummTemplate: this.secondColumnTemplate,
        },
        {
          name: 'Description',
          width: 'auto',
          fieldName: 'description',
          colummTemplate: this.thirdColumnTemplate,
        },
      ],
      onEditCellStart: (e) => {
        const {column, value, index} = e.detail
        this.editingColumn = {
          column,
          index,
        }
        switch (column) {
          case 'age':
            this.secondColumnTemplate.style.display = 'block'
            this.secondColumnTemplate.value = value
            this.secondColumnTemplate.style.width = '100%'
            this.secondColumnTemplate.focus()
            break
          case 'description':
            this.thirdColumnTemplate.style.display = 'block'
            this.thirdColumnTemplate.value = value
            this.thirdColumnTemplate.style.width = '100%'
            this.thirdColumnTemplate.focus()
            break
        }
      },
    }

    table.data = [
      {
        gender: 'Male',
        age: 20,
        description:
          'Third column data with longer text than the others - row 1',
      },
      {
        gender: 'Female',
        age: 20,
        description:
          'Third column data with longer text than the others - row 2',
      },
      {
        gender: 'Other',
        age: 20,
        description:
          'Third column data with longer text than the others - row 3',
      },
    ]

    this.querySelector('#description').addEventListener('blur', (e) => {
      const newTableData = table.finishEditing(
        this.editingColumn.column,
        this.editingColumn.index,
        e.target.value,
      )
      this.thirdColumnTemplate.style.display = 'none'
    })
    this.querySelector('#age').addEventListener('blur', (e) => {
      const newTableData = table.finishEditing(
        this.editingColumn.column,
        this.editingColumn.index,
        e.target.value,
      )
      this.secondColumnTemplate.style.display = 'none'
    })
  }
}
