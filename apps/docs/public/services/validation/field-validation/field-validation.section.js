import {CdgBaseComponent} from '../../../shared/base-component'
import template from './field-validation.section.html'

import {TextFieldValidate} from '@comfortdelgro/wc-compass/src/shared/form-validation'

export class CdgFieldValidationSection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const field = this.querySelector('#sample-validation')

    const fieldValidation = new TextFieldValidate(field.value)
    fieldValidation.required = true
    fieldValidation.minLength = 5
    fieldValidation.maxLength = 20

    field.addEventListener('input', () => {
      fieldValidation.update(field.value)
      console.log(fieldValidation.valid)
      if (fieldValidation.invalid) {
        console.log(fieldValidation.reason)
      }
    })
  }
}
