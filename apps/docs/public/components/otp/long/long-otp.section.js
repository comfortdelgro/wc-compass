import {CdgBaseComponent} from '../../../shared/base-component'
import template from './long-otp.section.html'

export class CdgLongOtpSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const otpInput = this.querySelector('cdg-otp')
    otpInput.addEventListener('fieldinput', (event) => {
      console.log(event.detail)
      cdgToastService.toast(
        (event.detail.valid ? 'Valid: ' : 'Invalid: ') + event.detail.value,
      )
    })
  }
}
