import {
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER,
} from '@comfortdelgro/wc-compass/src/shared/regex'
import {CdgBaseComponent} from '../../../shared/base-component'
import template from './form.section.html'

import {
  CdgFormGroup,
  TextFieldValidator,
} from '@comfortdelgro/wc-compass/src/shared/form-validation'

export class CdgFormValidationSection extends CdgBaseComponent {
  content
  form = new CdgFormGroup()
  submitButton
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.validateFirstName()
    this.validateLastName()
    this.validatePhoneNumber()
    this.validateEmail()
    this.submitButton = this.querySelector('#submitButton')
    this.validateForm()
  }

  validateForm() {
    if (!this.form.valid) {
      this.submitButton.setAttribute('disabled', '')
    } else {
      this.submitButton.removeAttribute('disabled')
    }
  }

  validateFirstName() {
    const field = this.querySelector('#firstName')
    const input = field.querySelector('input')
    const messageElement = field.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidator(field.value)
    fieldValidation.required = true
    fieldValidation.update(input.value)
    this.form.register(fieldValidation)

    const validateField = () => {
      let message = defaultText
      fieldValidation.update(input.value)
      if (fieldValidation.invalid) {
        field.classList.add('error')
        switch (fieldValidation.reason) {
          case 'required':
            message = 'This field is required'

            break
          default:
            break
        }
      } else {
        field.classList.remove('error')
      }
      messageElement.textContent = message
      this.validateForm()
    }

    input.addEventListener('blur', () => {
      fieldValidation.validate()
      validateField()
    })

    input.addEventListener('input', () => {
      validateField()
    })
  }

  validateLastName() {
    const field = this.querySelector('#lastName')
    const input = field.querySelector('input')
    const messageElement = field.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidator(field.value)
    fieldValidation.required = true
    fieldValidation.update(input.value)
    this.form.register(fieldValidation)

    const validateField = () => {
      let message = defaultText
      fieldValidation.update(input.value)
      if (fieldValidation.invalid) {
        field.classList.add('error')
        switch (fieldValidation.reason) {
          case 'required':
            message = 'This field is required'
            break

          default:
            break
        }
      } else {
        field.classList.remove('error')
      }
      messageElement.textContent = message
      this.validateForm()
    }

    input.addEventListener('blur', () => {
      fieldValidation.validate()
      validateField()
    })

    input.addEventListener('input', () => {
      validateField()
    })
  }

  validatePhoneNumber() {
    const field = this.querySelector('#phoneNumber')
    const input = field.querySelector('input')
    const messageElement = field.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidator(field.value)
    fieldValidation.required = true
    fieldValidation.pattern = REGEX_PHONE_NUMBER
    fieldValidation.update(input.value)
    this.form.register(fieldValidation)

    const validateField = () => {
      let message = defaultText
      fieldValidation.update(input.value)
      if (fieldValidation.invalid) {
        field.classList.add('error')
        switch (fieldValidation.reason) {
          case 'required':
            message = 'This field is required'
            break

          case 'pattern':
            message = 'Wrong phone number format'
            break

          default:
            break
        }
      } else {
        field.classList.remove('error')
      }
      messageElement.textContent = message
      this.validateForm()
    }

    input.addEventListener('blur', () => {
      fieldValidation.validate()
      validateField()
    })

    input.addEventListener('input', () => {
      validateField()
    })
  }

  validateEmail() {
    const field = this.querySelector('#email')
    const input = field.querySelector('input')
    const messageElement = field.querySelector('.cdg-helper-message')

    const defaultText = messageElement.textContent

    const fieldValidation = new TextFieldValidator(field.value)
    fieldValidation.required = true
    fieldValidation.pattern = REGEX_EMAIL
    fieldValidation.update(input.value)
    this.form.register(fieldValidation)

    const validateField = () => {
      let message = defaultText
      fieldValidation.update(input.value)
      if (fieldValidation.invalid) {
        field.classList.add('error')
        switch (fieldValidation.reason) {
          case 'required':
            message = 'This field is required'
            break

          case 'pattern':
            message = 'Wrong phone email format'
            break

          default:
            break
        }
      } else {
        field.classList.remove('error')
      }
      messageElement.textContent = message
      this.validateForm()
    }

    input.addEventListener('blur', () => {
      fieldValidation.validate()
      validateField()
    })

    input.addEventListener('input', () => {
      validateField()
    })
  }
}
