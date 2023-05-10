export class CdgRadio extends HTMLLabelElement {
  static get observedAttributes() {
    return ['disabled', 'checked']
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

  radio
  constructor() {
    super()
    this.radio = this.querySelector('input[type="radio"]')
  }

  connectedCallback() {
    this.classList.add('cdg-radio')

    this.radio.addEventListener('change', () => {
      const radios = document.querySelectorAll(
        `[name="${this.radio.getAttribute('name')}"]`,
      )
      if (radios && radios.length) {
        radios.forEach((radio) => {
          if (radio.parentElement.checked) {
            radio.checked = false
            radio.parentElement.checked = false
          }
        })
      }

      this.checked = this.radio.checked
    })

    this.radio.checked = this.checked
    this.radio.disabled = this.disabled
  }

  attributeChangedCallback(attr) {
    if (!this.radio) {
      console.error(
        'This component should contain an input with radio type inside',
      )
      return
    }
    switch (attr) {
      case 'checked':
        this.radio.checked = this.checked
        break

      case 'disabled':
        this.radio.disabled = this.disabled
        break

      default:
        break
    }
  }
}
