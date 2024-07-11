import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './short-otp.section.html'

export class CdgShortOtpSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const value = this.querySelector('#otpValue')
    const otpInput = this.querySelector('cdg-otp')
    otpInput.addEventListener('fieldinput', (event) => {
      value.textContent = event.detail.value
    })
  }
}
