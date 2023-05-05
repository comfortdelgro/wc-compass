import {CdgDocumentComponent} from '../../shared/document-component'
import template from './tooltip.html'

export class CdgTooltipDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template

    setTimeout(() => {
      const directions = document.querySelector(
        'cdg-dropdown[name="directions"]',
      )
      const cdgPopovers = document.querySelectorAll('cdg-tooltip')
      directions.addEventListener('onchangevalue', function (event) {
        cdgPopovers.forEach((cdgPopover) => {
          if (cdgPopover) {
            const closeButton = document.querySelector('bottom-close-button')
            cdgPopover.setAttribute('direction', event.detail)
          }
        })
      })
    }, 1000)
  }
}
