export class FieldValidateProps {
  valid = false
  invalid = false
  dirty = false
  touched = false
}

export class TextFieldValidator extends FieldValidateProps {
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
    if (this.required && (!this.value || !this.value.trim())) {
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

    this.valid = true
    this.invalid = false
    this.reason = ''
  }
}

export class DatepickerValidator extends FieldValidateProps {
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

export class DropdownValidator extends FieldValidateProps {
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

export class CdgFormGroup {
  fields = []

  get valid() {
    let formValid = true
    if (this.fields.length) {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].invalid) {
          formValid = false
        }
      }
    }
    return formValid
  }

  register(field) {
    this.fields.push(field)
  }
}
