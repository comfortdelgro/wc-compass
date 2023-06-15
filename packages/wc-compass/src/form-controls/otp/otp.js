import {CdgBaseComponent} from '../../shared/base-component'

export class CdgOtp extends CdgBaseComponent {
  static get observedAttributes() {
    return ['length', 'type']
  }

  get length() {
    return Number(this.getAttribute('length')) || 4
  }

  set length(length) {
    this.setAttribute('length', length)
  }

  get type() {
    return this.getAttribute('type') || 'number'
  }

  set type(type) {
    this.setAttribute('type', type)
  }

  inputs = []

  valid = false
  value = ''

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-otp')
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'length':
        this.attachInput()
        break

      default:
        break
    }
  }

  attachInput() {
    this.inputs = []
    this.textContent = ''
    if (this.length > 2) {
      for (let i = 0; i < this.length; i++) {
        const input = document.createElement('input')
        input.classList.add('cdg-otp')
        input.setAttribute('type', 'text')
        input.addEventListener('input', this.handleInputChange.bind(this, i))
        input.addEventListener('focus', () => {
          input.select()
        })
        input.addEventListener('keydown', this.handleKeyDown.bind(this, i))

        this.inputs.push(input)
        this.appendChild(input)
      }
    }
  }

  handleKeyDown(index, event) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        event.stopPropagation()
        const previousField = this.inputs[index - 1]
        if (previousField) {
          previousField.focus()
          previousField.select()
        }
        break

      case 'ArrowRight':
        event.preventDefault()
        event.stopPropagation()
        const nextField = this.inputs[index + 1]
        if (nextField) {
          nextField.focus()
          nextField.select()
        }
        break

      case 'Backspace':
        if (!this.inputs[index].value) {
          event.preventDefault()
          event.stopPropagation()

          const backField = this.inputs[index - 1]
          if (backField) {
            backField.focus()
            backField.select()
          }
        }
        break

      default:
        break
    }
  }

  handleInputChange(index, event) {
    let value = (this.inputs[index].value + '').replace(/\s/g, '').trim()
    if (this.type === 'number') {
      value = value.replace(/\D+/g, '')
    }

    if (!value || !value.length) {
      this.inputs[index].value = ''
      this.validate(index, event)
      return
    }

    const nextField = this.inputs[index + 1]

    if (value.length > 1) {
      this.inputs[index].value = value.slice(0, 1)
    }

    if (nextField) {
      this.inputs[index + 1].focus()
      if (value.length > 1) {
        nextField.value = value.slice(1, value.length)
        nextField.dispatchEvent(new Event('input'))
      }
    }

    this.validate(index, event)
  }

  validate(index, event) {
    if (!this.inputs.length) {
      return
    }
    let valid = true
    let value = ''
    this.inputs.forEach((input) => {
      if (!input.value) {
        valid = false
      }
      value += input.value ? input.value : '_'
    })

    this.valid = valid
    this.value = value

    this.dispatchEvent(
      new CustomEvent('fieldinput', {
        detail: {
          inputs: this.inputs,
          valid: this.valid,
          originalEvent: event,
          target: this.inputs[index],
          value: this.value,
        },
      }),
    )
  }
}
