import {CdgBaseComponent} from '../../../shared/base-component'
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
        this.rowTemplate.style.display = 'block'
        this.rowTemplate.style.height = `${
          this.querySelector('tr').clientHeight
        }px`
        this.rowTemplate.style.width = `${
          this.querySelector('tr').clientWidth
        }px`
        switch (column) {
          case 'id':
            this.id.style.width = `${tableHeaders[0].clientWidth - 10}px`
            this.id.value = rowData.id
            this.taskName.style.width = `${tableHeaders[1].clientWidth - 10}px`
            this.taskName.value = rowData.taskName
            this.duration.style.width = `${tableHeaders[2].clientWidth - 10}px`
            this.duration.value = rowData.duration
            this.approved.parentElement.style.width = `${
              tableHeaders[3].clientWidth - 10
            }px`
            this.approved.checked = rowData.approved
            break
        }
      },
    }

    table.data = [
      {
        id: 1,
        taskName: 'Pretty long text.',
        duration: 5,
        approved: false,
      },
      {
        id: 2,
        taskName: 'Pretty long text.',
        duration: 4,
        approved: true,
      },
      {
        id: 3,
        taskName: 'Pretty long text.',
        duration: 6,
        approved: true,
      },
    ]
  }

  validateFields() {
    const taskNameValue = this.taskName.value.trim()
    const durationValue = this.duration.value
    const toast = document.createElement('cdg-toast')
    toast.setAttribute('color', 'red')

    if (taskNameValue.length <= 10) {
      const id = 'default' + new Date().getTime()
      toast.textContent = 'Task name must have length > 10.'
      cdgToastService.show(id, toast)
      return false
    }
    if (durationValue <= 0) {
      const id = 'default' + new Date().getTime()
      toast.textContent = 'Invalid duration.'
      cdgToastService.show(id, toast)
      return false
    }
    return true
  }
  bindEventsToButton() {
    const saveButton = this.querySelector('#save')
    const cancelButton = this.querySelector('#cancel')

    saveButton.addEventListener('click', () => {
      if (this.validateFields()) {
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
      }
    })

    cancelButton.addEventListener('click', () => {
      const dialog = cdgDialogService.confirm({
        dialogTitle: 'Cancel Editing',
        message: 'Are you sure want to cancel editing?',
        executeLabel: 'Yes',
      })
      dialog.addEventListener('close', (event) => {
        const table = this.querySelector('#sampleEditableTable2')
        table.finishEditing(this.rowTemplate)
        cdgToastService.toast('Row editing canceled.')
      })
    })
  }
}
