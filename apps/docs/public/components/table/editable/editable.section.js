import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './editable.section.html'

export class CdgTableEditableSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }
  firstColumnTemplate
  thirdColumnTemplate
  editingColumn = {}
  onInit() {
    this.firstColumnTemplate = document.getElementById('email')
    this.secondColumnTemplate = document.getElementById('age')
    this.thirdColumnTemplate = document.getElementById('description')
    const table = this.querySelector('#sampleEditableTable')
    table.options = {
      columns: [
        {
          name: 'Email',
          width: 'auto',
          fieldName: 'email',
          colummTemplate: this.firstColumnTemplate,
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
          case 'email':
            this.firstColumnTemplate.style.display = 'block'
            const email = this.firstColumnTemplate.querySelector('input')
            email.value = value
            email.style.width = `${this.firstColumnTemplate.parentElement.clientWidth}px`
            email.style.height = `${this.firstColumnTemplate.parentElement.clientHeight}px`
            this.firstColumnTemplate.focus()
            break
          case 'age':
            this.secondColumnTemplate.style.display = 'block'
            const numberInput = this.secondColumnTemplate.querySelector('input')
            numberInput.value = value
            numberInput.style.width = `${this.secondColumnTemplate.parentElement.clientWidth}px`
            numberInput.style.height = `${this.secondColumnTemplate.parentElement.clientHeight}px`
            this.secondColumnTemplate.focus()
            break
          case 'description':
            this.thirdColumnTemplate.style.display = 'block'
            const input = this.thirdColumnTemplate.querySelector('input')
            input.value = value
            input.style.width = `${this.thirdColumnTemplate.parentElement.clientWidth}px`
            input.style.height = `${this.thirdColumnTemplate.parentElement.clientHeight}px`
            this.thirdColumnTemplate.focus()
            break
        }
      },
    }

    table.data = [
      {
        email: 'email1@gmail.com',
        age: 20,
        description:
          'Third column data with longer text than the others - row 1',
      },
      {
        email: 'email2@gmail.com',
        age: 20,
        description:
          'Third column data with longer text than the others - row 2',
      },
      {
        email: 'email3@gmail.com',
        age: 20,
        description:
          'Third column data with longer text than the others - row 3',
      },
    ]
    this.bindEventsToButton()
  }

  validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value)
  }

  validateAge(value) {
    return value > 0
  }
  bindEventsToButton() {
    const saveButtons = this.querySelectorAll('.save')
    const cancelButtons = this.querySelectorAll('.cancel')
    const self = this
    saveButtons.forEach((saveButton) => {
      saveButton.addEventListener('click', () => {
        const table = this.querySelector('#sampleEditableTable')
        const data = [...table.data]

        const saveButtonId = saveButton.getAttribute('id')
        const toast = document.createElement('cdg-toast')
        toast.setAttribute('color', 'red')
        switch (saveButtonId) {
          case 'ageSaveBtn':
            const ageValue =
              self.secondColumnTemplate.querySelector('input').value
            if (this.validateAge(ageValue)) {
              data[this.editingColumn.index][this.editingColumn.column] =
                ageValue
              table.finishEditing(self.secondColumnTemplate)
            } else {
              const id = new Date().getTime()
              toast.textContent = 'Invalid age.'
              cdgToastService.show(id, toast)
              return
            }
            break
          case 'descriptionSaveBtn':
            data[this.editingColumn.index][this.editingColumn.column] =
              self.thirdColumnTemplate.querySelector('input').value
            table.finishEditing(self.thirdColumnTemplate)
            break
          case 'emailSaveBtn':
            const emailValue =
              self.firstColumnTemplate.querySelector('input').value
            if (this.validateEmail(emailValue)) {
              data[this.editingColumn.index][this.editingColumn.column] =
                emailValue
              table.finishEditing(self.firstColumnTemplate)
            } else {
              const id = new Date().getTime()
              toast.textContent = 'Invalid email.'
              cdgToastService.show(id, toast)
              return
            }
        }

        const loadingId = cdgLoadingService.show('global')
        setTimeout(() => {
          cdgLoadingService.hide(loadingId)
          table.data = data
          cdgToastService.toast('Data is successfully saved!')
        }, 1000)
      })
    })

    cancelButtons.forEach((cancelButton) => {
      cancelButton.addEventListener('click', () => {
        const dialog = cdgDialogService.confirm({
          dialogTitle: 'Cancel Editing',
          message: 'Are you sure want to cancel editing?',
          executeLabel: 'Yes',
        })
        dialog.addEventListener('close', () => {
          const table = self.querySelector('#sampleEditableTable')
          const cancelButtonId = cancelButton.getAttribute('id')
          switch (cancelButtonId) {
            case 'emailCancelBtn':
              table.finishEditing(self.firstColumnTemplate)
              cdgToastService.toast('Email editing canceled.')
              break
            case 'ageCancelBtn':
              table.finishEditing(self.secondColumnTemplate)
              cdgToastService.toast('Age editing canceled.')
              break
            case 'descriptionCancelBtn':
              table.finishEditing(self.thirdColumnTemplate)
              cdgToastService.toast('Description editing canceled.')
              break
          }
        })
      })
    })
  }
}
