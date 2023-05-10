export class CdgCheckbox extends HTMLLabelElement {
  static get observedAttributes() {
    return ['disabled', 'indeterminate', 'checked']
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(checked) {
    if (checked) {
      this.setAttribute('checked', '')
    } else {
      this.removeAttribute('checked')
    }
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate')
  }

  set indeterminate(indeterminate) {
    if (indeterminate) {
      this.setAttribute('indeterminate', '')
    } else {
      this.removeAttribute('indeterminate')
    }
  }

  checkbox
  constructor() {
    super()
    this.checkbox = this.querySelector('input[type="checkbox"]')
  }

  connectedCallback() {
    this.classList.add('cdg-checkbox')

    this.checkbox.addEventListener('change', () => {
      this.checked = this.checkbox.checked
      this.indeterminate = false
    })

    this.checkbox.checked = this.checked
    this.checkbox.indeterminate = this.indeterminate
    this.checkbox.disabled = this.disabled
  }

  attributeChangedCallback(attr) {
    if (!this.checkbox) {
      console.error(
        'This component should contain an input with checkbox type inside',
      )
      return
    }
    switch (attr) {
      case 'checked':
        this.checkbox.checked = this.checked
        break

      case 'disabled':
        this.checkbox.disabled = this.disabled
        break

      case 'indeterminate':
        this.checkbox.indeterminate = this.indeterminate
        break

      default:
        break
    }
  }
}
