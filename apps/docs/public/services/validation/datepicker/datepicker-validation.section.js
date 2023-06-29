import {CdgBaseComponent} from '../../../shared/base-component'
import template from './datepicker-validation.section.html'

import {TextFieldValidate} from '@comfortdelgro/wc-compass/src/shared/form-validation'

export class CdgDatepickerValidationSection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const field = this.querySelector('cdg-datepicker')
    const group = this.querySelector('.cdg-input-group')
    const messageElement = this.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidate(field.value)
    fieldValidation.required = true

    field.addEventListener('onDateChange', (event) => {
      let message = defaultText
      fieldValidation.update(event.detail)
      if (fieldValidation.invalid) {
        group.classList.add('error')
        switch (fieldValidation.reason) {
          case 'required':
            message = 'This field is required'
            break

          case 'minLength':
            message =
              'The inputed value should be longer than minimum ' +
              fieldValidation.minLength +
              ' chars'
            break

          case 'maxLength':
            message =
              'This field allows you to input ' +
              fieldValidation.maxLength +
              ' chars'
            break

          default:
            break
        }
      } else {
        group.classList.remove('error')
      }
      messageElement.textContent = message
    })
  }
}
