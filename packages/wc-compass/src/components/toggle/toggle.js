export class CdgToggle extends HTMLLabelElement {
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

  toggle
  constructor() {
    super()
    this.toggle = this.querySelector('input[type="checkbox"]')
  }

  connectedCallback() {
    this.classList.add('cdg-toggle')

    this.toggle.addEventListener('change', () => {
      this.checked = this.toggle.checked
      this.indeterminate = false
    })

    this.toggle.checked = this.checked
    this.toggle.indeterminate = this.indeterminate
    this.toggle.disabled = this.disabled
  }

  attributeChangedCallback(attr) {
    if (!this.toggle) {
      console.error(
        'This component should contain an input with checkbox type inside',
      )
      return
    }
    switch (attr) {
      case 'checked':
        this.toggle.checked = this.checked
        break

      case 'disabled':
        this.toggle.disabled = this.disabled
        break

      case 'indeterminate':
        this.toggle.indeterminate = this.indeterminate
        break

      default:
        break
    }
  }
}
