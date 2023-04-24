import {CdgDocumentComponent} from '../../shared/document-component'
import template from './datepicker.html'

export class CdgDatepickerDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const datepickers = this.querySelectorAll('cdg-datepicker')
    const radios = this.querySelectorAll('input[name="sample2"]')
    const disabledDatepickers = this.querySelectorAll(
      'cdg-datepicker.diabled-datepicker',
    )
    if (radios.length > 0) {
      radios.forEach((radio) => {
        radio.addEventListener('change', function change(params) {
          const value = params.target.value
          disabledDatepickers.forEach((disabledDatepicker) => {
            if (value === '0') {
              disabledDatepicker.setAttribute('disabled', 'true')
            } else {
              disabledDatepicker.removeAttribute('disabled')
            }
          })
        })
      })
    }
    datepickers.forEach((datepicker) => {
      datepicker.addEventListener('onDateChange', function (event) {
        cdgToastService.toast('onDateChange: ' + JSON.stringify(event.detail))
      })
    })
  }
}
