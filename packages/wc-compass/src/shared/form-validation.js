export class FieldValidateProps {
  valid = false
  invalid = false
  dirty = false
  touched = false
}

export class TextFieldValidate extends FieldValidateProps {
  value = ''
  required = false
  pattern = ''
  maxLength = 0
  minLength = 0

  reason = ''

  constructor(value) {
    super()
    this.value = value
    this.validate()
  }

  update(value) {
    this.value = value
    this.validate()
  }

  validate() {
    if (this.required && !this.value) {
      this.valid = false
      this.invalid = true
      this.reason = 'required'
      return
    }

    if (this.maxLength && this.value.length > this.maxLength) {
      this.valid = false
      this.invalid = true
      this.reason = 'maxLength'
      return
    }

    if (this.minLength && this.value.length < this.minLength) {
      this.valid = false
      this.invalid = true
      this.reason = 'minLength'
      return
    }

    if (this.pattern && !this.pattern.test(this.value)) {
      this.valid = false
      this.invalid = true
      this.reason = 'pattern'
      return
    }

    console.log('end')
    this.valid = true
    this.invalid = false
    this.reason = ''
  }
}

export class DatepickerValidate extends FieldValidateProps {
  value = ''
  required = false

  reason = ''

  constructor(value) {
    super()
    this.value = value
    this.validate()
  }

  update(value) {
    this.value = value
    this.validate()
  }

  validate() {
    if (this.required && !this.value) {
      this.valid = false
      this.invalid = true
      this.reason = 'required'
      return
    }

    this.valid = true
    this.invalid = false
    this.reason = ''
  }
}

export class DropdownValidate extends FieldValidateProps {
  value = ''
  required = false

  reason = ''

  constructor(value) {
    super()
    this.value = value
    this.validate()
  }

  update(value) {
    this.value = value
    this.validate()
  }

  validate() {
    if (this.required && !this.value) {
      this.valid = false
      this.invalid = true
      this.reason = 'required'
      return
    }

    this.valid = true
    this.invalid = false
    this.reason = ''
  }
}

export class CdgFormGroup {}
