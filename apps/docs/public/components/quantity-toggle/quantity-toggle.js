import {CdgDocumentComponent} from '../../shared/document-component'
import template from './quantity-toggle.html'

export class CdgQuantityToggleDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template

    window.handleOnchange = (event) => {
      cdgToastService.toast('Changed ' + event.target.value)
    }

    setTimeout(() => {
      const quantityToggle = document.querySelector('#maxMinSample')
      if (quantityToggle) {
        quantityToggle.addEventListener('validChange', (event) => {
          cdgToastService.toast('Error: ' + JSON.stringify(event.detail))
        })
      }

      const stepValue = document.getElementById('step-value')
      if (stepValue) {
        const quantityToggleStep = document.getElementById(
          'quantity-toggle-step',
        )
        stepValue.addEventListener('change', (event) => {
          console.log(event.target.value)
          quantityToggleStep.setAttribute('step', event.target.value)
        })
      }
    }, 1000)
  }
}
