export class FieldValidateProps {
  valid = false
  invalid = false
  dirty = false
  touched = false
}

export class TextFieldValidate extends FieldValidateProps {
  value = ''
  required = false

  constructor(value, options) {
    this.value = value
    this.validate()
  }

  validate() {}
}

export class CdgFormGroup {}
