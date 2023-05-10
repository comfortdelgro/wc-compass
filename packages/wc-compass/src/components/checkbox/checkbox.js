export class CdgCheckbox extends HTMLLabelElement {
  checkbox
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-checkbox')
    this.checkbox = this.querySelector('input[type="checkbox"]')

    this.checkbox.addEventListener('change', () => {
      if (this.checkbox.checked) {
        this.setAttribute('checked', '')
      } else {
        this.removeAttribute('checked')
      }
    })

    if (this.checkbox.disabled) {
      this.setAttribute('disabled', '')
    } else {
      this.classList.remove('disabled')
    }

    if (this.checkbox.indeterminate) {
      this.setAttribute('indeterminate', '')
    } else {
      this.removeAttribute('indeterminate')
    }
  }
}
