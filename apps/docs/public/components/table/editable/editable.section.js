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
            this.secondColumnTemplate.style.width = `${this.secondColumnTemplate.parentElement.clientWidth}px`
            this.secondColumnTemplate.style.height = `${this.secondColumnTemplate.parentElement.clientHeight}px`
            this.secondColumnTemplate.focus()
            break
          case 'description':
            this.thirdColumnTemplate.style.display = 'block'
            this.thirdColumnTemplate.value = value
            this.thirdColumnTemplate.style.width = `${this.thirdColumnTemplate.parentElement.clientWidth}px`
            this.thirdColumnTemplate.style.height = `${this.thirdColumnTemplate.parentElement.clientHeight}px`
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
      const table = this.querySelector('#sampleEditableTable')
      const data = [...table.data]
      data[this.editingColumn.index][this.editingColumn.column] = e.target.value
      table.data = data
      this.thirdColumnTemplate.style.display = 'none'
    })
    this.querySelector('#age').addEventListener('blur', (e) => {
      const table = this.querySelector('#sampleEditableTable')
      const data = [...table.data]
      data[this.editingColumn.index][this.editingColumn.column] = e.target.value
      table.data = data
      this.secondColumnTemplate.style.display = 'none'
    })
  }
}
