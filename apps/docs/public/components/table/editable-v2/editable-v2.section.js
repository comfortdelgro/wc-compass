import { CdgBaseComponent } from '../../../shared/base-component'
import template from './editable-v2.section.html'

export class CdgTableEditableSection2 extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  currentEditingRow = null
  rowTemplate
  id
  taskName
  duration
  approved
  edittingRow
  onInit() {
    const table = this.querySelector('#sampleEditableTable2')
    this.rowTemplate = this.querySelector('#editableRow')
    this.bindEventsToButton()
    table.options = {
      columns: [
        {
          name: 'ID',
          width: '24px',
          fieldName: 'id',
          colummTemplate: this.rowTemplate,
        },
        {
          name: 'Task Name',
          width: '240px',
          fieldName: 'taskName',
        },
        {
          name: 'Duration',
          width: '100px',
          fieldName: 'duration',
        },
        {
          name: 'Approved',
          width: '40px',
          fieldName: 'approved',
        },
      ],
      onEditCellStart: (e) => {
        const {column, value, index} = e.detail
        this.edittingRow = index
        const tableHeaders = this.querySelectorAll('th')
        const rowData = table.data[index]
        this.id = this.rowTemplate.querySelector('#id')
        this.taskName = this.rowTemplate.querySelector('#taskName')
        this.duration = this.rowTemplate.querySelector('#duration')
        this.approved = this.rowTemplate.querySelector('#approved')
        this.rowTemplate.style.display = 'flex'
        this.rowTemplate.style.height = `${
          this.querySelector('tr').clientHeight
        }px`
        this.querySelector('.actions').style.display = 'flex'
        switch (column) {
          case 'id':
            id.style.width = `${tableHeaders[0].clientWidth}px`
            id.value = rowData.id
            taskName.style.width = `${tableHeaders[1].clientWidth}px`
            taskName.value = rowData.taskName
            duration.style.width = `${tableHeaders[2].clientWidth}px`
            duration.value = rowData.duration
            approved.style.width = `${tableHeaders[3].clientWidth}px`
            approved.checked = rowData.approved

            break
        }
      },
    }

    table.data = [
      {
        id: 1,
        taskName: 'foo',
        duration: 5,
        approved: false,
      },
      {
        id: 2,
        taskName: 'foo',
        duration: 4,
        approved: true,
      },
      {
        id: 3,
        taskName: 'foo',
        duration: 6,
        approved: true,
      },
    ]
  }

  bindEventsToButton() {
    const saveButton = this.querySelector('#save')
    const cancelButton = this.querySelector('#cancel')

    saveButton.addEventListener('click', () => {
      const table = this.querySelector('#sampleEditableTable2')
      const data = [...table.data]
      data[this.edittingRow] = {
        id: this.id.value,
        taskName: this.taskName.value,
        duration: this.duration.value,
        approved: this.approved.checked,
      }
      const loadingId = cdgLoadingService.show('global')
      setTimeout(() => {
        cdgLoadingService.hide(loadingId)
        table.data = data
        cdgToastService.toast('Data is successfully saved!')

      }, 1000)
    })

    cancelButton.addEventListener('click', () => {
      const confirmCancel = confirm('Are you sure want to cancel editing?')
      if (confirmCancel) {
        this.querySelector('.actions').style.display = 'none'

        this.rowTemplate.style.display = 'none'
      }
    })
  }
}
