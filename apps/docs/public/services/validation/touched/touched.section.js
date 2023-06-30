import {REGEX_EMAIL} from '@comfortdelgro/wc-compass/src/shared/regex'
import {CdgBaseComponent} from '../../../shared/base-component'
import template from './touched.section.html'

import {TextFieldValidator} from '@comfortdelgro/wc-compass/src/shared/form-validation'

export class CdgTouchedSection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const field = this.querySelector('#sample-validation')
    const group = this.querySelector('.cdg-input-group')
    const messageElement = this.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidator(field.value)
    fieldValidation.required = true
    fieldValidation.minLength = 5
    fieldValidation.maxLength = 20
    fieldValidation.pattern = REGEX_EMAIL

    const validateField = () => {
      let message = defaultText
      fieldValidation.update(field.value)
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

          case 'pattern':
            message = 'Should follow pattern email'
            break

          default:
            break
        }
      } else {
        group.classList.remove('error')
      }
      messageElement.textContent = message
    }

    field.addEventListener('blur', () => {
      fieldValidation.validate()
      validateField()
    })

    field.addEventListener('input', () => {
      validateField()
    })
  }
}
