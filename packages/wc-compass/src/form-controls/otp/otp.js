import {CdgBaseComponent} from '../../shared/base-component'

export class CdgOtp extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-otp')
    const input = document.createElement('input')
    input.classList.add('cdg-otp')
    input.setAttribute('type', 'number')

    this.appendChild(input)
  }
}
